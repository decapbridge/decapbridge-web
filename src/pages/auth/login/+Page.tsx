import {
  Title,
  Text,
  Group,
  Stack,
  Anchor,
  Button,
  Divider,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useData } from "vike-react/useData";

import InternalLink from "/src/components/core/InternalLink";
import type { Data } from "./+data";
import { usePageContext } from "vike-react/usePageContext";
import { TbAt, TbLock } from "react-icons/tb";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import { useQueryClient } from "@tanstack/react-query";
import usePkceAuth from "/src/hooks/usePkceAuth";
import directus from "/src/utils/directus";
import z from "zod";
import { MicrosoftIcon } from "/src/components/ui/MicrosoftIcon";
import { GoogleIcon } from "/src/components/ui/GoogleIcon";

const schema = z.object({
  email: z.email().max(255),
  password: z.string().min(3).max(255),
});

const LoginPage: React.FC = () => {
  const content = useData<Data>();

  const { urlParsed } = usePageContext();

  const queryClient = useQueryClient();

  const { isPkceFlow, getSsoRedirectUrl } = usePkceAuth();

  const form = useAsyncForm({
    allowMultipleSubmissions: true,
    loadingOverlay: true,
    schema,
    initialValues: {
      email: "",
      password: "",
    },
    action: async ({ email, password }) => {
      await directus.login({ email, password }, { mode: "json" });
      await queryClient.invalidateQueries({
        queryKey: ["user"],
        refetchType: "all",
      });
    },
  });

  return (
    <Stack m="auto" maw={420} gap={0}>
      <FormWrapper form={form} withBorder shadow="md" p="xl" radius="lg">
        <Stack>
          <Stack gap={0}>
            {urlParsed.search["site_name"] ? (
              <Title ta="center" order={4}>
                Sign into {urlParsed.search["site_name"]}
              </Title>
            ) : (
              <Title ta="center" order={4} mb="xs">
                {content.header}
              </Title>
            )}
          </Stack>

          <Group grow>
            <Button
              leftSection={<GoogleIcon />}
              radius="xl"
              variant="default"
              component="a"
              href={getSsoRedirectUrl("google")}
            >
              Google
            </Button>
            <Button
              leftSection={<MicrosoftIcon />}
              radius="xl"
              variant="default"
              component="a"
              href={getSsoRedirectUrl("microsoft")}
            >
              Microsoft
            </Button>
          </Group>

          <Divider label="Or continue with email" labelPosition="center" />
          <TextInput
            name="email"
            label={content.email.label}
            placeholder={content.email.placeholder}
            leftSection={<TbAt size={16} />}
            required
            {...form.getInputProps("email")}
            autoFocus
          />
          <Group pos="relative">
            <PasswordInput
              w="100%"
              name="password"
              label={content.password.label}
              placeholder={content.password.placeholder}
              leftSection={<TbLock size={16} />}
              required
              {...form.getInputProps("password")}
            />
            <Anchor
              component={InternalLink}
              href="/auth/password/forgot"
              size="xs"
              pos="absolute"
              top={4}
              right={0}
            >
              {content.forgot_password}
            </Anchor>
          </Group>
          {form.errors.action && (
            <Group justify="center">{form.errors.action}</Group>
          )}
          <Button
            {...form.submitButtonProps}
            fullWidth
            accessKey="s"
            mt={form.errors.action ? 0 : "xs"}
          >
            {isPkceFlow ? content.login_pkce_button : content.login_button}
          </Button>
          {!isPkceFlow && (
            <Group gap={6} justify="center" align="center">
              <Text c="dimmed" size="sm">
                {content.sub_header}
              </Text>
              <Anchor component={InternalLink} href="/auth/signup" size="sm">
                {content.create_account}
              </Anchor>
            </Group>
          )}
        </Stack>
      </FormWrapper>
    </Stack>
  );
};

export default LoginPage;
