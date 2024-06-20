import { Button, Card, Stack, Text } from "@mantine/core";
import { Site } from "/src/utils/directus";
import InternalLink from "/src/components/core/InternalLink";

interface SiteCardProps {
  site: Site;
}

const SiteCard: React.FC<SiteCardProps> = ({ site }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Text fw="bold">{site.repo}</Text>
        <Button
          component={InternalLink}
          href={`/dashboard/sites/edit?siteId=${site.id}`}
          variant="light"
          fullWidth
        >
          Edit site
        </Button>
      </Stack>
    </Card>
  );
};

export default SiteCard;
