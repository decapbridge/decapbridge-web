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
import {
  TbBrandGoogleFilled,
  TbBrandWindowsFilled,
  TbAt,
  TbLock,
} from "react-icons/tb";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import { useQueryClient } from "@tanstack/react-query";
import usePkceAuth from "/src/hooks/usePkceAuth";
import directus from "/src/utils/directus";
import z from "zod";

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
      {urlParsed.search["site_name"] ? (
        <>
          <Title ta="center" order={2}>
            Sign into
          </Title>
          <Title ta="center" order={3}>
            <code>{urlParsed.search["site_name"]}</code>
          </Title>
        </>
      ) : (
        <Title ta="center">{content.header}</Title>
      )}
      {!isPkceFlow && (
        <Group mt={4} gap={6} justify="center" align="center">
          <Text c="dimmed" size="sm">
            {content.sub_header}
          </Text>
          <Anchor component={InternalLink} href="/auth/signup" size="sm">
            {content.create_account}
          </Anchor>
        </Group>
      )}

      <FormWrapper
        form={form}
        withBorder
        shadow="md"
        p="xl"
        my="md"
        radius="lg"
      >
        <Stack>
          <Group justify="center">
            <Button
              leftSection={<TbBrandGoogleFilled size="1.25rem" />}
              radius="xl"
              variant="default"
              component="a"
              href={getSsoRedirectUrl("google")}
            >
              Google
            </Button>
            <Button
              leftSection={<TbBrandWindowsFilled size="1.25rem" />}
              radius="xl"
              variant="default"
              component="a"
              href={getSsoRedirectUrl("microsoft")}
            >
              Microsoft
            </Button>
          </Group>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="sm"
          />
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
        </Stack>
      </FormWrapper>
    </Stack>
  );
};

export default LoginPage;
