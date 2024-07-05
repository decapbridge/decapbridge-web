import {
  Table,
  ScrollArea,
  Group,
  Avatar,
  Text,
  Button,
  Divider,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { CustomSchema, Site } from "/src/utils/directus";
import TimeAgo from "/src/components/ui/TimeAgo";
import { IconX } from "@tabler/icons-react";
import RemoveCollaboratorModal from "../../RemoveCollaboratorModal";
import UserAvatar from "/src/components/misc/UserAvatar";

interface CollaboratorsTableProps {
  site: Site;
}

const CollaboratorsTable: React.FC<CollaboratorsTableProps> = ({ site }) => {
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
          {user.last_access ? <TimeAgo timestamp={user.last_access} /> : ""}
        </Table.Td>
        <Table.Td>
          {(site.user_created as any)?.id !== user.id && (
            <RemoveCollaboratorModal site={site} user={user}>
              {(open) => (
                <Button
                  size="xs"
                  variant="light"
                  leftSection={<IconX size="1.25em" />}
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
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </Stack>
    </Paper>
  );
};

export default CollaboratorsTable;
