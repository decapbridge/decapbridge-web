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
import { Site } from "/src/utils/directus";
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

  const isAdmin = (site?.user_created as any)?.id === user.id;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Group justify="space-between">
          <Avatar.Group>
            {allUsers.map((u: any) => (
              <UserAvatar key={u.id} user={u} />
            ))}
          </Avatar.Group>
          {isAdmin ? (
            <Badge size="sm" variant="light">
              You are the admin
            </Badge>
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
        <Group justify="space-between">
          <Text fw="bold">{site.repo}</Text>
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
        {isAdmin ? (
          <Button
            component={InternalLink}
            href={`/dashboard/sites/edit?siteId=${site.id}`}
            variant="filled"
            fullWidth
          >
            Manage site
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
