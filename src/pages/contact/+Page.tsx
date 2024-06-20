import { z } from "zod";
import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Text,
  Stack,
  Box,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useData } from "vike-react/useData";

import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import useMaybeUser from "/src/hooks/useMaybeUser";
import directus from "/src/utils/directus";
import { Data } from "./+data";

const schema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email().max(255),
  message: z.string().min(3).max(1023),
});

const ContactPage: React.FC = () => {
  const contact = useData<Data>();
  const { user } = useMaybeUser();

  const form = useAsyncForm({
    loadingOverlay: true,
    initialValues: {
      name: user?.first_name
        ? `${user.first_name} ${user.last_name ?? ""}`
        : "",
      email: user?.email ?? "",
      message: "",
    },
    schema,
    action: async (values) => {
      try {
        const res = await fetch(`${directus.url.origin}/contact-form`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values, null, 2),
        });
        if (!res.ok) {
          throw new Error("Request failed.");
        }
        notifications.show({
          color: "green",
          message: contact.success_message,
        });
      } catch (error) {
        throw new Error(contact.error_message);
      }
    },
  });

  return (
    <FormWrapper w="100%" form={form} withBorder radius="lg" p="lg" my="md">
      <Stack>
        <Box>
          <Title ta="center" order={2}>
            {contact.meta.title}
          </Title>
          <Text ta="center">{contact.meta.description}</Text>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            label={contact.name_label}
            name="name"
            variant="filled"
            {...form.getInputProps("name")}
          />
          <TextInput
            label={contact.email_label}
            name="email"
            variant="filled"
            {...form.getInputProps("email")}
          />
        </SimpleGrid>
        <Textarea
          label={contact.message_label}
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
          {...form.getInputProps("message")}
        />
        {form.errors.action && (
          <Group justify="center">{form.errors.action}</Group>
        )}
        <Group justify="center">
          <Button {...form.submitButtonProps} size="md" accessKey="s">
            {contact.submit_button}
          </Button>
        </Group>
      </Stack>
    </FormWrapper>
  );
};

export default ContactPage;
