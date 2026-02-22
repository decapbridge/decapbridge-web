import {
  Container,
  Button,
  Card,
  Group,
  SimpleGrid,
  Title,
  Text,
  Center,
  Stack,
  Loader,
  Tooltip,
  Alert,
  Anchor,
  useMantineTheme,
} from "@mantine/core";
import { TbInfoCircle, TbPlus } from "react-icons/tb";
import { readItems } from "@directus/sdk";
import InternalLink from "/src/components/core/InternalLink";
import SiteCard from "/src/pages/dashboard/sites/SiteCard";
import useDirectusRequest from "/src/hooks/useDirectusRequest";
import { Site } from "/src/utils/directus";
import useCurrentUser from "/src/hooks/useCurrentUser";
import isProUser from "/src/utils/isProUser";
import { freeSitesLimit } from "/src/utils/freeLimits";

const SitesPage: React.FC = () => {
  const theme = useMantineTheme();
  const user = useCurrentUser();
  const { data } = useDirectusRequest(
    readItems("sites", {
      fields: [
        "*",
        { collaborators: ["*", { directus_users_id: ["*"] }] },
        { user_created: ["*"] },
      ],
    }),
  );

  const canAddSite =
    isProUser(user) ||
    (data?.filter((s: any) => s.user_created?.id === user.id)?.length ?? 0) <
      freeSitesLimit;

  const addSiteButton = canAddSite ? (
    <Button
      component={InternalLink}
      href="/dashboard/sites/new"
      rightSection={<TbPlus size="1.25rem" />}
      variant="light"
    >
      Add site
    </Button>
  ) : (
    <Tooltip label="Free account limit reached.">
      <Button rightSection={<TbPlus size="1.25rem" />} variant="light" disabled>
        Add site
      </Button>
    </Tooltip>
  );
  return (
    <Container size="xl" p="xl" my="md">
      <Stack>
        {!canAddSite && (
          <Alert
            variant="light"
            color={theme.primaryColor}
            title="Free account maxed out."
            icon={<TbInfoCircle />}
            bdrs="md"
          >
            You've used the {freeSitesLimit} free sites allowed on this free
            account. Please consider upgrading to remove all limits, access
            premium features and help the development of DecapBridge.{" "}
            <Anchor
              size="sm"
              component={InternalLink}
              href="/dashboard/billing"
            >
              Click here to go to the billing page and learn more.
            </Anchor>
          </Alert>
        )}
        <Group justify="space-between">
          <Title order={3}>Your sites ({data?.length ?? 0})</Title>
          {addSiteButton}
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
                <TbPlus size="4rem" />
                <Text c="dimmed">Add your first site</Text>
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
    </Container>
  );
};

export default SitesPage;
