import { Center, Loader, Stack, Text } from "@mantine/core";
import { readItem } from "@directus/sdk";
import { usePageContext } from "vike-react/usePageContext";

import SiteForm from "/src/pages/dashboard/sites/SiteForm";
import useDirectusRequest from "/src/hooks/useDirectusRequest";
import { Site } from "/src/utils/directus";
import { CodeHighlight } from "@mantine/code-highlight";
import { getDirectusUrl, getGitGatewayUrl } from "/src/utils/constants";
import { useEffect } from "react";
import navigate from "/src/utils/navigate";

const getBackendConfig = (site: Site) => `
backend:
  name: git-gateway
  branch: main
  repo: ${site.repo}
  identity_url: ${getDirectusUrl()}/identity/${site.id}
  gateway_url: ${getGitGatewayUrl()}
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
      {/* <Group>
        <Button
          component={InternalLink}
          href="/dashboard/sites"
          variant="subtle"
          size="compact-md"
          leftSection={< size="1.25rem" />}
        >
          Back to all sites
        </Button>
      </Group> */}
      {data ? (
        <Stack>
          <SiteForm initialValues={data as Site} />
          <Text>Use this following "backend config" in Decap CMS:</Text>
          <CodeHighlight style={{ borderRadius: '0.5rem' }} c="var(--text-color)" language="markdown" code={getBackendConfig(data as Site)} />
          {/* <Group justify="flex-end">
            <DeleteSiteModal site={data as Site}>
              {(open) => (
                <Button
                  onClick={open}
                  color="red"
                  size="xs"
                  rightSection={<IconTrash stroke={1.5} size="1.25rem" />}
                >
                  Delete
                </Button>
              )}
            </DeleteSiteModal>
          </Group> */}
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
