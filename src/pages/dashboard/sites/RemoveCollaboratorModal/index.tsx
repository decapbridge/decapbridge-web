import { ReactNode } from "react";
import { deleteItem, readItems } from "@directus/sdk";
import { Stack, Group, Button, Text, Modal, Code } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import directus, { CustomSchema, Site } from "/src/utils/directus";
import { IconTrash } from "@tabler/icons-react";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";

interface RemoveCollaboratorProps {
  site: Site;
  user: CustomSchema['directus_users'][number];
  children: (open: () => void) => ReactNode
}

const RemoveCollaboratorModal: React.FC<RemoveCollaboratorProps> = ({
  site,
  user,
  children
}) => {
  const [opened, { open, close }] = useDisclosure()
  const queryClient = useQueryClient();

  const form = useAsyncForm({
    schema: z.object({}),
    initialValues: {},
    action: async () => {
      const [collaboratorToDelete] = await directus.request(readItems('sites_directus_users', {
        filter: {
          sites_id: site.id,
          directus_users_id: user.id
        }
      }));
      if (collaboratorToDelete) {
        await directus.request(deleteItem('sites_directus_users', collaboratorToDelete.id))
      }
      notifications.show({
        color: "green",
        message: "Collaborator removed.",
      });
      await queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
  });

  return (
    <>
      {children(open)}
      <Modal title={`Remove collaborator?`} opened={opened} onClose={close}>
        <FormWrapper form={form} radius={0}>
          <Stack gap="xs">
            <Text>
              You&apos;re about to remove <Code>{user.first_name} {user.last_name} ({user.email})</Code> from the <Code>{site.repo}</Code> site.
              <br />
              Are you sure?
            </Text>
            <Group justify="flex-end">
              <Button onClick={close} variant="default" size="xs">
                Cancel
              </Button>
              <Button
                {...form.submitButtonProps}
                color="red"
                size="xs"
                rightSection={
                  <IconTrash
                    size="1rem"
                    stroke={1.5}
                    style={{ margin: "0 -0.125rem 0 -0.25rem" }}
                  />
                }
              >
                Remove collaborator
              </Button>
            </Group>
          </Stack>
        </FormWrapper>
      </Modal>
    </>
  );
};

export default RemoveCollaboratorModal;