import { ReactNode } from "react";
import { deleteItem } from "@directus/sdk";
import { Stack, Group, Button, Text, Modal, Code } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import directus, { Site } from "/src/utils/directus";
import { IconTrash } from "@tabler/icons-react";
import { z } from "zod";
import navigate from "/src/utils/navigate";
import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";

interface DeleteSiteModalProps {
  site: Site;
  children: (open: () => void) => ReactNode
}

const DeleteSiteModal: React.FC<DeleteSiteModalProps> = ({
  site,
  children
}) => {
  const [opened, { open, close }] = useDisclosure()
  const queryClient = useQueryClient();

  const form = useAsyncForm({
    schema: z.object({}),
    initialValues: {},
    action: async () => {
      await directus.request(deleteItem("sites", site.id!));
      notifications.show({
        color: "green",
        message: "Site deleted.",
      });
      await navigate("/dashboard/sites");
      await queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
  });

  return (
    <>
      {children(open)}
      <Modal title={`Delete site?`} opened={opened} onClose={close}>
        <FormWrapper form={form}>
          <Stack gap="xs">
            <Text>
              You&apos;re about to delete the <Code>{site.repo}</Code> site.
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
                Delete site
              </Button>
            </Group>
          </Stack>
        </FormWrapper>
      </Modal>
    </>
  );
};

export default DeleteSiteModal;