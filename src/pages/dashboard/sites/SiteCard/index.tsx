import { Badge, Button, Card, Group, Stack, Text } from "@mantine/core";
import { Site } from "/src/utils/directus";
import InternalLink from "/src/components/core/InternalLink";
import useCurrentUser from "/src/hooks/useCurrentUser";
import { IconExternalLink } from "@tabler/icons-react";

interface SiteCardProps {
  site: Site;
}

const SiteCard: React.FC<SiteCardProps> = ({ site }) => {
  const user = useCurrentUser();
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Group justify="flex-end">
          {site.user_created === user.id ? (
            <Badge size="sm" variant="outline">You are the admin</Badge>
          ) : (
            <Badge size="sm" variant="outline">Collaborator</Badge>
          )}
        </Group>
        <Text fw="bold">{site.repo}</Text>
        {site.user_created === user.id ? (
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
            rightSection={(
              <IconExternalLink size="1.25em" stroke={1.5} />
            )}
          >
            Go to CMS
          </Button>
        )}
      </Stack>
    </Card>
  );
};

export default SiteCard;
