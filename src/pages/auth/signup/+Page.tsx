import {
  Title,
  Text,
  Stack,
  Anchor,
  Group,
  Paper,
  Button,
  Avatar,
  FileButton,
  TextInput,
  Divider,
} from "@mantine/core";
import { useData } from "vike-react/useData";
import { z } from "zod";

import InternalLink from "/src/components/core/InternalLink";
import type { Data } from "./+data";
import useAuthActions from "/src/hooks/useAuthActions";
import directus from "/src/utils/directus";
import { readMe, updateUser, uploadFiles } from "@directus/sdk";
import { useQueryClient } from "@tanstack/react-query";
import { TbEdit, TbUpload, TbX, TbAt, TbLock } from "react-icons/tb";
import PasswordStrength from "./PasswordStrength";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import { useRef, useMemo, useCallback } from "react";
import getAvatarUrl from "/src/utils/getAvatarUrl";
import { getDirectusUrl } from "/src/utils/constants";
import { MicrosoftIcon } from "/src/components/ui/MicrosoftIcon";
import { GoogleIcon } from "/src/components/ui/GoogleIcon";

const schema = z.object({
  avatar: z.url().or(z.any()).nullable(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.email().max(255),
  password: z.string().min(8).max(255).optional(),
});

const SignupPage: React.FC = () => {
  const content = useData<Data>();
  const { signup } = useAuthActions();
  const queryClient = useQueryClient();

  const resetRef = useRef<() => void>(null);

  const form = useAsyncForm({
    schema,
    initialValues: {
      avatar: null as any,
      first_name: "",
      last_name: "",
      email: "",
      password: undefined,
    },
    action: async (values) => {
      await signup({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password!,
      });

      if (values.avatar instanceof File) {
        const me = await directus.request(readMe());
        if (!me) {
          alert("Error with login");
          return;
        }

        const form = new FormData();
        form.append("file", values.avatar);
        const avatarFile = await directus.request(uploadFiles(form));
        await directus.request(updateUser(me.id, { avatar: avatarFile.id }));
        await queryClient.invalidateQueries({
          queryKey: ["user"],
          refetchType: "all",
        });
      }
    },
  });

  const avatarProps = form.getInputProps("avatar");
  const passwordProps = form.getInputProps("password");

  const avatarUrl = useMemo(() => {
    if (typeof window !== "undefined" && form.values.avatar instanceof File) {
      return URL.createObjectURL(form.values.avatar);
    }
    if (form.values.avatar) {
      return getAvatarUrl(form.values.avatar);
    }
  }, [form.values.avatar]);

  const clearFile = () => {
    avatarProps.onChange(null);
    resetRef.current?.();
  };

  const ssoRedirectUrl = `${getDirectusUrl()}/sso-exchange-token`;

  const getSsoRedirectUrl = useCallback(
    (provider: string) => {
      return `${getDirectusUrl()}/auth/login/${provider}?redirect=${encodeURIComponent(
        ssoRedirectUrl
      )}`;
    },
    [ssoRedirectUrl]
  );

  return (
    <Stack m="auto" maw={520}>
      <Stack gap={0}>
        <Title ta="center">{content.header}</Title>
        <Group gap={6} justify="center" align="center">
          <Text c="dimmed" size="sm">
            {content.sub_header}
          </Text>
          <Anchor component={InternalLink} href="/auth/login" size="sm">
            {content.login}
          </Anchor>
        </Group>
      </Stack>
      <Paper withBorder shadow="md" p="xl" radius="lg">
        <FormWrapper form={form} radius={0} shadow="none">
          <Stack gap="xl" pt="sm">
            <Group justify="center">
              <Button
                leftSection={<GoogleIcon />}
                radius="xl"
                variant="default"
                component="a"
                href={getSsoRedirectUrl("google")}
              >
                Signup with Google
              </Button>
              <Button
                leftSection={<MicrosoftIcon />}
                radius="xl"
                variant="default"
                component="a"
                href={getSsoRedirectUrl("microsoft")}
              >
                Signup with Microsoft
              </Button>
            </Group>
            <Divider label="OR, fill-in details" labelPosition="center" />
            <Stack>
              <Group gap="md">
                <Stack align="center" gap="xs" py="sm">
                  <Avatar
                    size="xl"
                    src={avatarUrl}
                    name={`${form.values.first_name} ${form.values.last_name}`}
                    color={form.values.first_name ? "initials" : undefined}
                  />
                  <Group gap="xs">
                    <FileButton
                      resetRef={resetRef}
                      onChange={avatarProps.onChange}
                      accept="image/png,image/jpeg"
                    >
                      {(props) => (
                        <Button
                          variant={avatarProps.value ? "light" : "subtle"}
                          size="xs"
                          {...props}
                          rightSection={
                            avatarProps.value ? (
                              <TbEdit size="1.5em" />
                            ) : (
                              <TbUpload size="1.5em" />
                            )
                          }
                        >
                          {avatarProps.value ? "Change" : "Upload picture"}
                        </Button>
                      )}
                    </FileButton>
                    {avatarProps.value && (
                      <Button
                        variant="light"
                        size="xs"
                        color="red"
                        onClick={clearFile}
                        rightSection={<TbX size="1.5em" />}
                      >
                        Remove
                      </Button>
                    )}
                  </Group>
                </Stack>
                <Stack style={{ flexGrow: 1 }}>
                  <TextInput
                    name="first_name"
                    label="First name"
                    placeholder="My first name"
                    {...form.getInputProps("first_name")}
                    autoFocus={!form.values.first_name}
                  />
                  <TextInput
                    name="last_name"
                    label="Last name"
                    placeholder="My last name"
                    {...form.getInputProps("last_name")}
                  />
                </Stack>
              </Group>

              <TextInput
                name="email"
                label="Email"
                placeholder="email@example.com"
                leftSection={<TbAt size={16} />}
                required
                {...form.getInputProps("email")}
              />
              <PasswordStrength
                name="password"
                label="Password"
                placeholder="Your password"
                leftSection={<TbLock size={16} />}
                required
                {...passwordProps}
                value={passwordProps.value ?? ""}
                autoComplete="new-password"
                autoFocus={Boolean(form.values.first_name)}
              />
              {form.errors.action && (
                <Group justify="center">{form.errors.action}</Group>
              )}
              <Group>
                <Button
                  {...form.submitButtonProps}
                  fullWidth
                  accessKey="s"
                  mt="xs"
                >
                  Sign up
                </Button>
              </Group>
            </Stack>
          </Stack>
        </FormWrapper>
      </Paper>
    </Stack>
  );
};

export default SignupPage;
