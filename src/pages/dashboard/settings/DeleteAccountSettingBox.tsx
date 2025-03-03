import {
  Paper,
  Title,
  Divider,
  Button,
  Modal,
  TextInput,
  Group,
  Text,
} from "@mantine/core";
import { deleteUser } from "@directus/sdk";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { TbAlertCircle } from "react-icons/tb";
import { useData } from "vike-react/useData";
import { z } from "zod";

import useCurrentUser from "/src/hooks/useCurrentUser";
import directus from "/src/utils/directus";
import useAsyncForm from "/src/hooks/useAsyncForm";
import useAuthActions from "/src/hooks/useAuthActions";
import type { Data } from "./+data";

const schema = z.object({
  confirm: z
    .string()
    .refine((value) => value.toLowerCase() === "delete my account"),
});

const DeleteAccountSettingBox: React.FC = () => {
  const user = useCurrentUser();
  const { logout } = useAuthActions();
  const [deleteModalOpened, { open, close }] = useDisclosure(false);
  const content = useData<Data>();

  const form = useAsyncForm({
    schema,
    initialValues: {
      confirm: "",
    },
    action: async () => {
      await directus.request(deleteUser(user.id));
      logout();
      notifications.show({
        title: content.delete_account_success_title,
        message: content.delete_account_success_message,
      });
    },
  });
  return (
    <Paper withBorder shadow="md" p="xl" my="xl" radius="md">
      <Title order={3}>{content.delete_account_heading}</Title>
      <Divider mt="xs" />
      <Text size="sm" my="sm">
        {content.delete_account_sub_heading}
      </Text>
      <Button color="red" onClick={open}>
        {content.delete_account_button}
      </Button>
      <Modal
        centered
        opened={deleteModalOpened}
        onClose={close}
        title={content.confirm_account_deletion_heading}
      >
        <form
          method="post"
          onSubmit={form.onSubmit}
          style={{ position: "relative" }}
        >
          <TextInput
            name="confirm"
            label={content.confirm_account_deletion_instruction}
            description={content.confirm_account_deletion_warning}
            {...form.getInputProps("confirm")}
            required
            mb="sm"
          />
          <Group justify="end">
            <Button
              {...form.submitButtonProps}
              color="red"
              size="xs"
              rightSection={
                <TbAlertCircle
                  size="1.25rem"
                  style={{ margin: "0 -0.125rem 0 -0.25rem" }}
                />
              }
            >
              {content.confirm_account_deletion_button}
            </Button>
          </Group>
        </form>
      </Modal>
    </Paper>
  );
};

export default DeleteAccountSettingBox;
