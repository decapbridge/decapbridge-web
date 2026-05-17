import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { Site, getMembership } from "/src/utils/directus";
import InternalLink from "/src/components/core/InternalLink";
import useCurrentUser from "/src/hooks/useCurrentUser";
import { TbBrandGithub, TbBrandGitlab, TbExternalLink } from "react-icons/tb";
import UserAvatar from "/src/components/misc/UserAvatar";

interface SiteCardProps {
  site: Site;
}

const SiteCard: React.FC<SiteCardProps> = ({ site }) => {
  const user = useCurrentUser();

  const allUsers = [
    site.user_created,
    ...site.collaborators.map((c) => c.directus_users_id),
  ].filter(Boolean);

  const isOwner = (site?.user_created as any)?.id === user.id;
  const isAdmin = getMembership(site, user.id)?.role === "admin";
  const canManage = isOwner || isAdmin;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack flex={1}>
        <Group justify="space-between">
          <Avatar.Group>
            {allUsers.map((u: any) => (
              <UserAvatar key={u.id} user={u} />
            ))}
          </Avatar.Group>
          {isOwner ? (
            <Badge size="sm" variant="light">
              You are the owner
            </Badge>
          ) : isAdmin ? (
            <Tooltip
              label={`${(site.user_created as any)?.email} is the owner.`}
            >
              <Badge size="sm" variant="light">
                You are an admin
              </Badge>
            </Tooltip>
          ) : (
            <Tooltip
              label={`${(site.user_created as any)?.email} is the owner.`}
            >
              <Badge size="sm" variant="outline">
                Collaborator
              </Badge>
            </Tooltip>
          )}
        </Group>
        <Group mt="auto" justify="space-between">
          <Text fw="bold">{site.name ?? site.repo}</Text>
          {site.git_provider === "github" ? (
            <Tooltip label="Github site">
              <TbBrandGithub size="1.5rem" />
            </Tooltip>
          ) : (
            <Tooltip label="Gitlab site">
              <TbBrandGitlab size="1.5rem" />
            </Tooltip>
          )}
        </Group>
        {canManage ? (
          <Button
            component={InternalLink}
            href={`/dashboard/sites/edit?siteId=${site.id}`}
            variant="filled"
            fullWidth
          >
            {isOwner ? "Manage site" : "Manage collaborators"}
          </Button>
        ) : (
          <Button
            component="a"
            href={site.cms_url}
            target="_blank"
            variant="filled"
            rightSection={<TbExternalLink size="1.25em" />}
          >
            Go to CMS
          </Button>
        )}
      </Stack>
    </Card>
  );
};

export default SiteCard;
