import { Button, Center, Group, Loader, Stack, Text } from "@mantine/core";
import { readItem } from "@directus/sdk";
import { usePageContext } from "vike-react/usePageContext";

import SiteForm from "/src/pages/dashboard/sites/SiteForm";
import useDirectusRequest from "/src/hooks/useDirectusRequest";
import { Site } from "/src/utils/directus";
import { CodeHighlight } from "@mantine/code-highlight";
import { getDirectusUrl, getGitGatewayUrl } from "/src/utils/constants";
import { useEffect } from "react";
import navigate from "/src/utils/navigate";
import { IconArrowLeft, IconTrash } from "@tabler/icons-react";
import InternalLink from "/src/components/core/InternalLink";
import DeleteSiteModal from "../DeleteSiteModal";

const getBackendConfig = (site: Site) => `
# Use DecapBridge auth
backend:
  name: git-gateway
  repo: ${site.repo}
  branch: main
  identity_url: ${getDirectusUrl()}/identity/${site.id}
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
  const { data } = useDirectusRequest(readItem("sites", siteId));
  useEffect(() => {
    if (!search.siteId) {
      navigate("/dashboard/sites")
    }
  }, [search.siteId])
  return (
    <Stack>
      <Group>
        <Button
          component={InternalLink}
          href="/dashboard/sites"
          variant="subtle"
          size="compact-md"
          leftSection={<IconArrowLeft size="1.25rem" />}
        >
          Back to all sites
        </Button>
      </Group>
      {data ? (
        <Stack>
          <SiteForm initialValues={data as Site} />
          <Text>Use this following "backend config" in Decap CMS:</Text>
          <CodeHighlight
            style={{ borderRadius: '0.5rem' }}
            c="var(--text-color)"
            language="yaml"
            code={getBackendConfig(data as Site)}
          />
          <Group justify="flex-end">
            <DeleteSiteModal site={data as Site}>
              {(open) => (
                <Button
                  onClick={open}
                  color="red"
                  size="sm"
                  rightSection={<IconTrash stroke={1.5} size="1.25rem" />}
                >
                  Delete
                </Button>
              )}
            </DeleteSiteModal>
          </Group>
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
