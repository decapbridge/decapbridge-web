import { Button, Divider, Group, SimpleGrid, Stack, TextInput, Title } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { customEndpoint, inviteUser } from "@directus/sdk";
import { z } from "zod";

import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import directus, { Site } from "/src/utils/directus";
import { IconArrowRight, IconSend, IconSend2 } from "@tabler/icons-react";

interface InviteUserFormProps {
  site: Site
}

const schema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().min(3).max(255),
});

const InviteUserForm: React.FC<InviteUserFormProps> = ({ site }) => {
  const queryClient = useQueryClient();
  const form = useAsyncForm({
    allowMultipleSubmissions: true,
    loadingOverlay: true,
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
    },
    schema,
    action: async (values) => {
      await directus.request(customEndpoint({
        method: 'POST',
        path: `/sites/${site.id}/invite`,
        body: JSON.stringify(values)
      }))
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      // TODO: show errors in alert or succes message
      form.reset();
    },
  });

  return (
    <FormWrapper form={form} withBorder radius="lg" p="xl" shadow="md">
      <Stack>
        <Title order={4}>Invite collaborators by email</Title>
        <Divider />
        <TextInput
          label="Email"
          name="email"
          {...form.getInputProps("email")}
          required
        />
        <SimpleGrid spacing="md" cols={{ base: 1, sm: 2 }}>
          <TextInput
            name="first_name"
            label="First name"
            {...form.getInputProps("first_name")}
          />
          <TextInput
            name="last_name"
            label="Last name"
            {...form.getInputProps("last_name")}
          />
        </SimpleGrid>
        <Group>
          <Button {...form.submitButtonProps} accessKey="i" rightSection={(
            <IconSend size="1.5em" stroke={1.5} />
          )}>
            Send invitation email
          </Button>
        </Group>
        {form.errors.action && <Group>{form.errors.action}</Group>}
      </Stack>
    </FormWrapper>
  );
};

export default InviteUserForm;
