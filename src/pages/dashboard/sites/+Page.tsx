import {
  Button,
  Card,
  Group,
  SimpleGrid,
  Title,
  Text,
  Center,
  Stack,
  Loader,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { readItems } from "@directus/sdk";
import InternalLink from "/src/components/core/InternalLink";
import SiteCard from "/src/pages/dashboard/sites/SiteCard";
import useDirectusRequest from "/src/hooks/useDirectusRequest";
import { Site } from "/src/utils/directus";

const SitesPage: React.FC = () => {
  const { data } = useDirectusRequest(readItems("sites"));
  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Your sites ({data?.length ?? 0})</Title>
        <Button
          component={InternalLink}
          href="/dashboard/sites/new" rightSection={<IconPlus size="1.25rem" stroke={1.5} />}>
          Add site
        </Button>
      </Group>
      {data?.length === 0 ? (
        <Center p="xl" m="xl">
          <Card
            component={InternalLink}
            href="/dashboard/sites/new"
            withBorder
            p="xl"
          >
            <Stack align="center" px="xl" py="lg">
              <IconPlus size="4rem" stroke={1} />
              <Text c="dimmed">Create your first site</Text>
            </Stack>
          </Card>
        </Center>
      ) : (
        <>
          {data ? (
            <SimpleGrid cols={{ base: 1, md: 2 }}>
              {data?.map((site) => (
                <SiteCard key={site.id} site={site as Site} />
              ))}
            </SimpleGrid>
          ) : (
            <Center>
              <Loader />
            </Center>
          )}
        </>
      )}
    </Stack>
  );
};

export default SitesPage;
