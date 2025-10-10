import {
  Table,
  ScrollArea,
  Group,
  Text,
  Button,
  Divider,
  Paper,
  Stack,
  Title,
  Tooltip,
  TextInput,
} from "@mantine/core";
import directus, { CustomSchema, Site } from "/src/utils/directus";
import TimeAgo from "/src/components/ui/TimeAgo";
import {
  TbAt,
  TbBrandGoogleFilled,
  TbBrandWindowsFilled,
  TbPassword,
  TbSend,
  TbX,
} from "react-icons/tb";
import RemoveCollaboratorModal from "../../RemoveCollaboratorModal";
import UserAvatar from "/src/components/misc/UserAvatar";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import { customEndpoint } from "@directus/sdk";
import z from "zod";
import { notifications } from "@mantine/notifications";
import queryClient from "/src/utils/queryClient";

const schema = z.object({
  email: z.email().max(255),
});

interface CollaboratorsTableProps {
  site: Site;
}

const CollaboratorsTable: React.FC<CollaboratorsTableProps> = ({ site }) => {
  const form = useAsyncForm({
    allowMultipleSubmissions: true,
    schema,
    initialValues: {
      email: "",
    },
    action: async (values) => {
      try {
        await directus.request(
          customEndpoint({
            method: "POST",
            path: `/sites/${site.id}/invite`,
            body: JSON.stringify(values),
          })
        );
        notifications.show({
          message: "Invite email sent!",
        });
      } catch (error) {
        if ((error as any).errors) {
          notifications.show({
            message: (error as any).errors.error_description,
          });
        }
      }
      form.reset();
      await queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
  });

  // const [selection, setSelection] = useState(['1']);

  // const toggleRow = (id: string) =>
  //   setSelection((current) =>
  //     current.includes(id) ? current.filter((user) => user !== id) : [...current, id]
  //   );
  // const toggleAll = () =>
  //   setSelection((current) => (current.length === collaborators.length ? [] : collaborators.map((user) => user.id)));

  const allUsers = [
    site.user_created,
    ...site.collaborators.map((c) => c.directus_users_id),
  ].filter(Boolean) as CustomSchema["directus_users"];

  const rows = allUsers.map((user) => {
    // const selected = selection.includes(user.id);
    return (
      <Table.Tr
        key={user.id}
        // className={cx({ [classes.rowSelected]: selected })}
      >
        {/* <Table.Td>
          <Checkbox checked={selection.includes(user.id)} onChange={() => toggleRow(user.id)} />
        </Table.Td> */}
        <Table.Td>
          <Group gap="sm">
            <UserAvatar size={26} radius={26} user={user} />
            <Text size="sm" fw={500}>
              {user.first_name} {user.last_name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{user.email}</Table.Td>
        <Table.Td>
          <Group gap="xs">
            {user.provider === "google" ? (
              <Tooltip label="Google login">
                <TbBrandGoogleFilled size="1rem" />
              </Tooltip>
            ) : user.provider === "microsoft" ? (
              <Tooltip label="Microsoft login">
                <TbBrandWindowsFilled size="1rem" />
              </Tooltip>
            ) : (
              <Tooltip label="Password login">
                <TbPassword size="1rem" />
              </Tooltip>
            )}
            {user.last_access ? (
              <TimeAgo fz="sm" timestamp={user.last_access} />
            ) : (
              ""
            )}
          </Group>
        </Table.Td>
        <Table.Td>
          {(site.user_created as any)?.id !== user.id && (
            <RemoveCollaboratorModal site={site} user={user}>
              {(open) => (
                <Button
                  size="xs"
                  variant="light"
                  leftSection={<TbX size="1.25em" />}
                  onClick={open}
                >
                  Remove access
                </Button>
              )}
            </RemoveCollaboratorModal>
          )}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Paper withBorder radius="lg" p="xl" shadow="md">
      <Stack>
        <Title order={4}>Manage collaborators for this site</Title>
        <Divider />
        <FormWrapper form={form} radius={0} shadow="none">
          <Group align="flex-end">
            <TextInput
              style={{ flexGrow: 1 }}
              labelProps={{ mb: 4, ml: 2 }}
              name="email"
              label="Invite new collaborator by email"
              placeholder="someone@example.com"
              leftSection={<TbAt size={16} />}
              required
              {...form.getInputProps("email")}
            />
            <Button
              {...form.submitButtonProps}
              accessKey="s"
              mt="xs"
              rightSection={<TbSend size="1.5em" />}
            >
              Send invitation email
            </Button>
          </Group>
        </FormWrapper>
        <ScrollArea>
          <Table miw={800} verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                {/* <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === collaborators.length}
                indeterminate={selection.length > 0 && selection.length !== collaborators.length}
              />
            </Table.Th> */}
                <Table.Th>Full name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Last access</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody data-with-row-border>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </Stack>
    </Paper>
  );
};

export default CollaboratorsTable;
