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
import { passwordReset, readMe, updateUser, uploadFiles } from "@directus/sdk";
import { usePageContext } from "vike-react/usePageContext";

import InternalLink from "/src/components/core/InternalLink";
import directus from "/src/utils/directus";
import onlyDiff from "/src/utils/onlyDiff";
import { TbEdit, TbUpload, TbX, TbLock } from "react-icons/tb";
import PasswordStrength from "../signup/PasswordStrength";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import { useCallback, useMemo, useRef } from "react";
import getAvatarUrl from "/src/utils/getAvatarUrl";
import z from "zod";
import { getDirectusUrl } from "/src/utils/constants";
import { GoogleIcon } from "/src/components/ui/GoogleIcon";
import { MicrosoftIcon } from "/src/components/ui/MicrosoftIcon";

// If user is here, there 2 possible paths:
// 1. set a password using the token, login, then go to cms
// 2. do a SSO login, which is set to send to /auth/sso-callback with a redirect param, which goes to cms
// In both cases, this is just to "setup" the account, then user will initiate PKCE from CMS for final login.

const schema = z.object({
  avatar: z.url().or(z.any()).nullable(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.email().max(255),
  password: z.string().min(8).max(255).optional(),
});

const errorPage = (msg: string) => (
  <Stack ta="center">
    <Title order={2}>{msg}</Title>
    <Anchor component={InternalLink} href="/auth/password/forgot">
      Back to home page
    </Anchor>
  </Stack>
);

const FinalizePage: React.FC = () => {
  const { urlParsed } = usePageContext();

  const resetRef = useRef<() => void>(null);

  const {
    token,
    email,
    first_name,
    last_name,
    avatar,
    site_id,
    site_name,
    redirect_uri,
    auth_type,
  } = urlParsed.search;

  if (!token) {
    return errorPage("Token missing from URL");
  }
  if (!site_id) {
    return errorPage("Missing site_id in URL");
  }
  if (!redirect_uri) {
    return errorPage("Missing redirect_uri in URL");
  }
  if (!auth_type) {
    return errorPage("Missing auth_type in URL");
  }

  const ssoRedirectUrl = `${getDirectusUrl()}/sso-exchange-token?redirect_uri=${redirect_uri}`;

  const getSsoRedirectUrl = useCallback(
    (provider: string) => {
      return `${getDirectusUrl()}/auth/login/${provider}?redirect=${encodeURIComponent(
        ssoRedirectUrl
      )}`;
    },
    [ssoRedirectUrl]
  );

  const form = useAsyncForm({
    schema,
    initialValues: {
      avatar: (avatar ?? null) as any,
      first_name: first_name ?? "",
      last_name: last_name ?? "",
      email: email ?? "",
      password: "",
    },
    action: async (values) => {
      if (values.avatar instanceof File) {
        const form = new FormData();
        form.append("file", values.avatar);
        const avatarFile = await directus.request(uploadFiles(form));
        values.avatar = avatarFile.id;
      }
      if (!token) {
        alert("Missing token in URL");
        return;
      }
      await directus.request(passwordReset(token, values.password!));
      await directus.login(
        { email: values.email, password: values.password! },
        {
          mode: "json",
        }
      );
      const me = await directus.request(readMe());
      if (!me) {
        alert("Error with login");
        return;
      }
      await directus.request(
        updateUser(
          me.id,
          onlyDiff(me, {
            first_name: values.first_name,
            last_name: values.last_name,
            ...(values.avatar ? { avatar: values.avatar } : {}),
          })
        )
      );

      window.location.href = redirect_uri;
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

  return (
    <Stack m="auto" maw={520}>
      <Paper withBorder shadow="md" p="xl" radius="lg">
        <FormWrapper form={form} radius={0} shadow="none">
          <Stack>
            <Stack gap="xs">
              <Title ta="center" order={3}>
                Finalize your account before joining {site_name}
              </Title>
              {auth_type === "pkce" && (
                <Stack>
                  <Text ta="center" c="dimmed" size="sm">
                    Choose your prefered login method <br />
                    for {email}:
                  </Text>
                  <Group justify="center">
                    <Button
                      leftSection={<GoogleIcon />}
                      radius="xl"
                      variant="default"
                      component="a"
                      href={getSsoRedirectUrl("google")}
                    >
                      Login with Google
                    </Button>
                    <Button
                      leftSection={<MicrosoftIcon />}
                      radius="xl"
                      variant="default"
                      component="a"
                      href={getSsoRedirectUrl("microsoft")}
                    >
                      Login with Microsoft
                    </Button>
                  </Group>
                  <Divider label="OR, use a password:" labelPosition="center" />
                </Stack>
              )}
            </Stack>
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
                  Save & go to CMS
                </Button>
              </Group>
            </Stack>
          </Stack>
        </FormWrapper>
      </Paper>
    </Stack>
  );
};

export default FinalizePage;
