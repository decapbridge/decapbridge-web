import { Avatar, Badge, Button, Card, Group, Stack, Text } from "@mantine/core";
import { Site } from "/src/utils/directus";
import InternalLink from "/src/components/core/InternalLink";
import useCurrentUser from "/src/hooks/useCurrentUser";
import { IconExternalLink } from "@tabler/icons-react";
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
            <Badge size="sm" variant="outline">
              You are the admin
            </Badge>
          ) : (
            <Badge size="sm" variant="outline">
              Collaborator
            </Badge>
          )}
        </Group>
        <Text fw="bold">{site.repo}</Text>
        {isAdmin ? (
          <Button
            component={InternalLink}
            href={`/dashboard/sites/edit?siteId=${site.id}`}
            variant="light"
            fullWidth
          >
            Manage site
          </Button>
        ) : (
          <Button
            component="a"
            href={site.cms_url}
            target="_blank"
            variant="light"
            rightSection={<IconExternalLink size="1.25em" stroke={1.5} />}
          >
            Go to CMS
          </Button>
        )}
      </Stack>
    </Card>
  );
};

export default SiteCard;
