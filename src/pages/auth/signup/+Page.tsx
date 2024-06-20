import {
  TextInput,
  PasswordInput,
  Title,
  Text,
  Button,
  Stack,
  Anchor,
  Group,
  SimpleGrid,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useData } from "vike-react/useData";
import { z } from "zod";

import InternalLink from "/src/components/core/InternalLink";
import useAuthActions from "/src/hooks/useAuthActions";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import type { Data } from "./+data";
// import PasswordStrength from "./PasswordStrength";

const schema = z.object({
  first_name: z.string().min(3).max(255),
  last_name: z.string().min(3).max(255),
  email: z.string().email().max(255),
  password: z.string().min(6).max(255),
});

const SignupPage: React.FC = () => {
  const { signup } = useAuthActions();
  const content = useData<Data>();
  const form = useAsyncForm({
    schema,
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    action: signup,
  });
  const passwordProps = form.getInputProps("password")
  return (
    <Stack w={480} gap={0}>
      <Title ta="center">{content.header}</Title>
      <Group gap={6} justify="center" align="center">
        <Text c="dimmed" size="sm">
          {content.sub_header}
        </Text>
        <Anchor component={InternalLink} href="/auth/login" size="sm">
          {content.login}
        </Anchor>
      </Group>
      <FormWrapper
        form={form}
        withBorder
        shadow="md"
        p="lg"
        my="md"
        radius="md"
      >
        <Stack>
          <SimpleGrid spacing="md" cols={{ base: 1, sm: 2 }}>
            <TextInput
              name="first_name"
              label={content.first_name.label}
              placeholder={content.first_name.placeholder}
              required
              {...form.getInputProps("first_name")}
              autoFocus
            />
            <TextInput
              name="last_name"
              label={content.last_name.label}
              placeholder={content.last_name.placeholder}
              required
              {...form.getInputProps("last_name")}
            />
          </SimpleGrid>
          <TextInput
            name="email"
            label={content.email.label}
            placeholder={content.email.placeholder}
            leftSection={<IconAt size={16} />}
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            name="password"
            label={content.password.label}
            placeholder={content.password.placeholder}
            leftSection={<IconLock size={16} />}
            required
            {...passwordProps}
            value={passwordProps.value ?? ''}
          />
          {form.errors.action && (
            <Group justify="center">
              {form.errors.action}
            </Group>
          )}
          <Button
            {...form.submitButtonProps}
            fullWidth
            accessKey="s"
            mt={form.errors.action ? 0 : "xs"}
          >
            {content.submit_button}
          </Button>
        </Stack>
      </FormWrapper>
    </Stack>
  );
};

export default SignupPage;
