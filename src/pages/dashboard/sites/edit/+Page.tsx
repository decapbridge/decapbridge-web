import { Button, Center, Divider, Group, Loader, Paper, Stack, Text, Title } from "@mantine/core";
import { readItem } from "@directus/sdk";
import { usePageContext } from "vike-react/usePageContext";

import SiteForm from "/src/pages/dashboard/sites/SiteForm";
import useDirectusRequest from "/src/hooks/useDirectusRequest";
import { CustomSchema, Site } from "/src/utils/directus";
import { CodeHighlight } from "@mantine/code-highlight";
import { getDirectusUrl, getGitGatewayUrl } from "/src/utils/constants";
import { useEffect } from "react";
import navigate from "/src/utils/navigate";
import { IconArrowLeft, IconExternalLink } from "@tabler/icons-react";
import InternalLink from "/src/components/core/InternalLink";
import InviteUserForm from "../InviteUserForm";
import CollaboratorsTable from "./CollaboratorsTable";

const getBackendConfig = (site: Site) => `
# Use DecapBridge auth
backend:
  name: git-gateway
  repo: ${site.repo}
  branch: main
  identity_url: ${getDirectusUrl()}/sites/${site.id}
  gateway_url: ${getGitGatewayUrl()}

  # Quickly see who did what (optional)
  commit_messages:
    create: Create {{collection}} “{{slug}}” - {{author-name}} <{{author-login}}> via DecapBridge
    update: Update {{collection}} “{{slug}}” - {{author-name}} <{{author-login}}> via DecapBridge
    delete: Delete {{collection}} “{{slug}}” - {{author-name}} <{{author-login}}> via DecapBridge
    uploadMedia: Upload “{{path}}” - {{author-name}} <{{author-login}}> via DecapBridge
    deleteMedia: Delete “{{path}}” - {{author-name}} <{{author-login}}> via DecapBridge
    openAuthoring: Message {{message}} - {{author-name}} <{{author-login}}> via DecapBridge
`

const EditSitePage: React.FC = () => {
  const {
    urlParsed: { search },
  } = usePageContext();
  const siteId = search.siteId;
  const { data } = useDirectusRequest(readItem("sites", siteId, {
    fields: ['*', { collaborators: ['*', { directus_users_id: ['*'] }] }]
  }));
  useEffect(() => {
    if (!search.siteId) {
      navigate("/dashboard/sites")
    }
  }, [search.siteId])
  return (
    <Stack>
      <Group justify="space-between">
        <Button
          component={InternalLink}
          href="/dashboard/sites"
          variant="subtle"
          size="compact-md"
          leftSection={<IconArrowLeft size="1.25rem" />}
        >
          Back to all sites
        </Button>
        {data?.cms_url && (
          <Button
            component="a"
            href={data?.cms_url}
            target="_blank"
            variant="light"
            rightSection={(
              <IconExternalLink size="1.25em" stroke={1.5} />
            )}
          >
            Go to CMS
          </Button>
        )}
      </Group>
      {data ? (
        <Stack gap="xl">
          <SiteForm initialValues={data as Site} />
          <Paper withBorder radius="lg" p="xl" shadow="md">
            <Stack>
              <Title order={4}>Setup Decap CMS</Title>
              <Divider />
              <Text>Use this following "backend config" in Decap CMS:</Text>
              <CodeHighlight
                style={{ borderRadius: '0.5rem' }}
                c="var(--text-color)"
                language="yaml"
                code={getBackendConfig(data as Site)}
              />
            </Stack>
          </Paper>

          <InviteUserForm site={data as Site} />

          <CollaboratorsTable
            site={data as Site}
            collaborators={data.collaborators!.map(c => c.directus_users_id as CustomSchema['directus_users'][number])}
          />

        </Stack>
      ) : (
        <Center>
          <Loader />
        </Center>
      )}
    </Stack>
  );
};

export default EditSitePage;
