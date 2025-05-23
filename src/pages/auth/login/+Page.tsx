import {
  TextInput,
  PasswordInput,
  Title,
  Text,
  Group,
  Button,
  Stack,
  Anchor,
} from "@mantine/core";
import { TbAt, TbLock } from "react-icons/tb";
import { useData } from "vike-react/useData";
import { z } from "zod";

import InternalLink from "/src/components/core/InternalLink";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import useAuthActions from "/src/hooks/useAuthActions";
import type { Data } from "./+data";

const schema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(3).max(255),
});

const LoginPage: React.FC = () => {
  const { login } = useAuthActions();
  const content = useData<Data>();
  const form = useAsyncForm({
    allowMultipleSubmissions: true,
    loadingOverlay: true,
    schema,
    initialValues: {
      email: "",
      password: "",
    },
    action: async ({ email, password }) => {
      await login(email, password);
    },
  });
  return (
    <Stack m="auto" maw={420} gap={0}>
      <Title ta="center">{content.header}</Title>
      <Group mt={4} gap={6} justify="center" align="center">
        <Text c="dimmed" size="sm">
          {content.sub_header}
        </Text>
        <Anchor component={InternalLink} href="/auth/signup" size="sm">
          {content.create_account}
        </Anchor>
      </Group>
      <FormWrapper
        form={form}
        withBorder
        shadow="md"
        p="xl"
        my="md"
        radius="lg"
      >
        <Stack>
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
            {content.login_button}
          </Button>
        </Stack>
      </FormWrapper>
    </Stack>
  );
};

export default LoginPage;
