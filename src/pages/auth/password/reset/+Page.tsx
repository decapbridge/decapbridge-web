import {
  Title,
  Text,
  Button,
  PasswordInput,
  Stack,
  Anchor,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconLock } from "@tabler/icons-react";
import { usePageContext } from "vike-react/usePageContext";
import { passwordReset } from "@directus/sdk";
import { useData } from "vike-react/useData";
import { z } from "zod";

import InternalLink from "/src/components/core/InternalLink";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import directus from "/src/utils/directus";
import navigate from "/src/utils/navigate";
import type { Data } from "./+data";

const schema = z.object({
  password: z.string().min(3).max(255),
});

const ResetPassword: React.FC = () => {
  const { urlParsed } = usePageContext();
  const token = urlParsed.search?.token
    ? String(urlParsed.search.token)
    : undefined;
  const content = useData<Data>();
  const form = useAsyncForm({
    schema,
    initialValues: {
      password: "",
    },
    action: async ({ password }) => {
      if (token) {
        await directus.request(passwordReset(token, password));
        notifications.show({
          color: "green",
          message: content.success_message,
        });
      }
      await navigate("/auth/login");
    },
  });
  return (
    <Stack w={460} gap={0}>
      {token ? (
        <>
          <Title ta="center">{content.header}</Title>
          <Text c="dimmed" size="sm" ta="center">
            {content.sub_header}
          </Text>
          <FormWrapper
            form={form}
            withBorder
            shadow="md"
            radius="md"
            p="xl"
            my="md"
          >
            <PasswordInput
              name="password"
              label={content.password.label}
              placeholder={content.password.placeholder}
              leftSection={<IconLock size={16} />}
              required
              {...form.getInputProps("password")}
              autoFocus
            />
            <Button {...form.submitButtonProps} mt="lg" fullWidth>
              {content.submit_button}
            </Button>
          </FormWrapper>
        </>
      ) : (
        <Stack ta="center">
          <Title order={2}>{content.token_missing}</Title>
          <Anchor component={InternalLink} href="/auth/password/forgot">
            {content.request_password}
          </Anchor>
        </Stack>
      )}
    </Stack>
  );
};

export default ResetPassword;
