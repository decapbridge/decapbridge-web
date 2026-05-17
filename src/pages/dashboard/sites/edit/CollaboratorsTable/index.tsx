import {
  Table,
  ScrollArea,
  Group,
  Text,
  ActionIcon,
  Badge,
  Button,
  Divider,
  Paper,
  Stack,
  Title,
  Tooltip,
  TextInput,
  Anchor,
  Alert,
  useMantineTheme,
} from "@mantine/core";
import directus, {
  CollaboratorRole,
  CustomSchema,
  Site,
  getMembership,
} from "/src/utils/directus";
import { formatDistanceToNow } from "date-fns";
import {
  TbAt,
  TbArrowDown,
  TbArrowUp,
  TbCopy,
  TbInfoCircle,
  TbPassword,
  TbSend,
  TbX,
} from "react-icons/tb";
import RemoveCollaboratorModal from "../../RemoveCollaboratorModal";
import UserAvatar from "/src/components/misc/UserAvatar";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import { customEndpoint, updateItem } from "@directus/sdk";
import z from "zod";
import { notifications } from "@mantine/notifications";
import queryClient from "/src/utils/queryClient";
import { GoogleIcon } from "/src/components/ui/GoogleIcon";
import { MicrosoftIcon } from "/src/components/ui/MicrosoftIcon";
import useCurrentUser from "/src/hooks/useCurrentUser";
import InternalLink from "/src/components/core/InternalLink";
import isProUser from "/src/utils/isProUser";
import { freeCollaboratorLimit } from "/src/utils/freeLimits";
import { getDirectusUrl } from "/src/utils/constants";

const schema = z.object({
  email: z.email().max(255),
});

interface CollaboratorsTableProps {
  site: Site;
}

const CollaboratorsTable: React.FC<CollaboratorsTableProps> = ({ site }) => {
  const user = useCurrentUser();
  const theme = useMantineTheme();
  const form = useAsyncForm({
    allowMultipleSubmissions: true,
    schema,
    initialValues: {
      email: "",
    },
    action: async (values) => {
      try {
        const result = await directus.request(
          customEndpoint<{ success: boolean; emailSent: boolean }>({
            method: "POST",
            path: `/sites/${site.id}/invite`,
            body: JSON.stringify(values),
          }),
        );
        notifications.show({
          message: result.emailSent
            ? "Invite email sent!"
            : "Collaborator added! Copy the invite link below to share it.",
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

  const ownerId = (site.user_created as any)?.id;
  const isOwner = ownerId === user.id;
  const isAdmin = getMembership(site, user.id)?.role === "admin";
  const canManageRoles = isOwner || isAdmin;
  const ownerIsPro = isProUser(site.user_created as any);

  const setRole = async (collaboratorId: number, role: CollaboratorRole) => {
    try {
      await directus.request(
        updateItem("sites_directus_users", collaboratorId, { role }),
      );
      notifications.show({
        message:
          role === "admin" ? "Promoted to admin." : "Demoted to collaborator.",
      });
      await queryClient.invalidateQueries({ queryKey: ["sites"] });
    } catch (error) {
      notifications.show({
        color: "red",
        message:
          (error as any)?.errors?.[0]?.message ?? "Failed to update role.",
      });
    }
  };

  const rows = allUsers.map((rowUser) => {
    const isRowOwner = ownerId === rowUser.id;
    const isSelf = rowUser.id === user.id;
    const collaborator = getMembership(site, rowUser.id);
    const role: CollaboratorRole | "owner" = isRowOwner
      ? "owner"
      : (collaborator?.role ?? "collaborator");

    return (
      <Table.Tr key={rowUser.id}>
        <Table.Td>
          <Group gap="sm">
            <UserAvatar size={26} radius={26} user={rowUser} />
            <Text size="sm" fw={500}>
              {rowUser.first_name} {rowUser.last_name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{rowUser.email}</Table.Td>
        <Table.Td>
          {(() => {
            const lastAccessLabel = rowUser.last_access
              ? `Last access: ${formatDistanceToNow(new Date(rowUser.last_access))} ago`
              : "Never logged in";
            return (
              <Tooltip label={lastAccessLabel}>
                {rowUser.provider === "google" ? (
                  <GoogleIcon />
                ) : rowUser.provider === "microsoft" ? (
                  <MicrosoftIcon />
                ) : (
                  <TbPassword size="1.25rem" />
                )}
              </Tooltip>
            );
          })()}
        </Table.Td>
        <Table.Td>
          {role === "owner" ? (
            <Badge size="sm" variant="filled">
              Owner
            </Badge>
          ) : role === "admin" ? (
            <Badge size="sm" variant="light">
              Admin
            </Badge>
          ) : (
            <Badge size="sm" variant="outline">
              Collaborator
            </Badge>
          )}
        </Table.Td>
        <Table.Td align="right">
          {!isRowOwner && (
            <Group gap="xs" justify="flex-end">
              {collaborator?.invite_token && (
                <Tooltip label="Copy invite link">
                  <ActionIcon
                    size="md"
                    variant="light"
                    onClick={() => {
                      const joinUrl = `${getDirectusUrl()}/sites/${site.id}/join?user_id=${rowUser.id}&token=${collaborator.invite_token}`;
                      navigator.clipboard.writeText(joinUrl);
                      notifications.show({
                        message: "Invite link copied to clipboard!",
                      });
                    }}
                  >
                    <TbCopy size="1em" />
                  </ActionIcon>
                </Tooltip>
              )}
              {canManageRoles &&
                ownerIsPro &&
                collaborator &&
                role === "collaborator" && (
                  <Tooltip label="Promote to admin">
                    <ActionIcon
                      size="md"
                      variant="light"
                      onClick={() => setRole(collaborator.id, "admin")}
                    >
                      <TbArrowUp size="1em" />
                    </ActionIcon>
                  </Tooltip>
                )}
              {canManageRoles &&
                ownerIsPro &&
                collaborator &&
                role === "admin" &&
                !isSelf && (
                  <Tooltip label="Demote to collaborator">
                    <ActionIcon
                      size="md"
                      variant="light"
                      onClick={() => setRole(collaborator.id, "collaborator")}
                    >
                      <TbArrowDown size="1em" />
                    </ActionIcon>
                  </Tooltip>
                )}
              {!(isSelf && role === "admin") && (
                <RemoveCollaboratorModal site={site} user={rowUser}>
                  {(open) => (
                    <Tooltip label="Remove access">
                      <ActionIcon size="md" variant="light" onClick={open}>
                        <TbX size="1em" />
                      </ActionIcon>
                    </Tooltip>
                  )}
                </RemoveCollaboratorModal>
              )}
            </Group>
          )}
        </Table.Td>
      </Table.Tr>
    );
  });

  const canAddCollaborators =
    ownerIsPro || (allUsers?.length ?? 0) < freeCollaboratorLimit;

  return (
    <Paper withBorder radius="lg" p="xl" shadow="md">
      <Stack>
        <Title order={4}>Manage collaborators for this site</Title>
        <Divider />
        {canAddCollaborators ? (
          <FormWrapper form={form} radius={0} shadow="none">
            <Group align="flex-end">
              <TextInput
                style={{ flexGrow: 1 }}
                labelProps={{ mb: 4, ml: 2 }}
                name="email"
                label="Invite new collaborator by email"
                placeholder="someone@example.com"
                description="User will receive an invitation link by email. You can also manually send them the invite link by copying it below."
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
        ) : (
          <Alert
            variant="light"
            color={theme.primaryColor}
            title="Free account collaborator limit reached."
            icon={<TbInfoCircle />}
            bdrs="md"
          >
            You've reached the free account limit of {freeCollaboratorLimit}{" "}
            users per site. As a power-user, please consider upgrading to remove
            all limits, access premium features and help the development of
            DecapBridge!
            <Anchor
              size="sm"
              component={InternalLink}
              href="/dashboard/billing"
            >
              Click here to go to the billing page and learn more.
            </Anchor>
          </Alert>
        )}
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
                <Table.Th>Login</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th align="right" ta="right">
                  Action
                </Table.Th>
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
