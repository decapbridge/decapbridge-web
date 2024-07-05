import {
  Container,
  Button,
  Center,
  Group,
  Loader,
  Stack,
  Tabs,
} from "@mantine/core";
import { readItem } from "@directus/sdk";
import { usePageContext } from "vike-react/usePageContext";

import SiteForm from "/src/pages/dashboard/sites/SiteForm";
import useDirectusRequest from "/src/hooks/useDirectusRequest";
import { CustomSchema, Site } from "/src/utils/directus";
import { useEffect } from "react";
import navigate from "/src/utils/navigate";
import {
  IconArrowLeft,
  IconBrandGithub,
  IconCode,
  IconExternalLink,
  IconSettings,
  IconTrash,
  IconUsers,
} from "@tabler/icons-react";
import InternalLink from "/src/components/core/InternalLink";
import InviteUserForm from "../InviteUserForm";
import CollaboratorsTable from "./CollaboratorsTable";
import fastClick from "/src/utils/fastClick";
import InstallConfig from "./InstallConfig";
import { PossibleLinks } from "/src/utils/types";
import DeleteSiteModal from "../DeleteSiteModal";

const EditSitePage: React.FC = () => {
  const {
    urlParsed: { pathname, search },
  } = usePageContext();
  const siteId = search.siteId;
  const { data } = useDirectusRequest(
    readItem("sites", siteId, {
      fields: [
        "*",
        { collaborators: ["*", { directus_users_id: ["*"] }] },
        { user_created: ["*"] },
      ],
    })
  );
  useEffect(() => {
    if (!search.siteId) {
      navigate("/dashboard/sites");
    }
  }, [search.siteId]);

  const tab = search.tab ?? "settings";
  const setTab = (tab: string | null) => {
    navigate(pathname as PossibleLinks, {
      queryParams: { tab: tab ?? "settings", siteId },
      keepScrollPosition: true,
    });
  };

  return (
    <Container size="md" my="xl">
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
          {data && (
            <Group>
              <Button
                component="a"
                href={`https://github.com/${data.repo}`}
                variant="light"
                rightSection={<IconBrandGithub size="1.375em" stroke={1.5} />}
              >
                Go to repository
              </Button>
              <Button
                component="a"
                href={data.cms_url}
                variant="light"
                rightSection={<IconExternalLink size="1.375em" stroke={1.5} />}
              >
                Go to CMS
              </Button>
            </Group>
          )}
        </Group>
        {data ? (
          <Tabs variant="pills" value={tab} onChange={setTab}>
            <Tabs.List mb="sm" fw={500}>
              <Tabs.Tab
                onMouseDown={fastClick}
                value="settings"
                leftSection={<IconSettings size="1.5em" stroke={1.5} />}
                py={0}
                h="2.25rem"
                pl="sm"
              >
                Settings
              </Tabs.Tab>
              <Tabs.Tab
                onMouseDown={fastClick}
                value="manage"
                leftSection={<IconUsers size="1.5em" stroke={1.5} />}
                py={0}
                h="2.25rem"
                pl="sm"
              >
                Manage collaborators
              </Tabs.Tab>
              <Tabs.Tab
                onMouseDown={fastClick}
                value="install"
                leftSection={<IconCode size="1.5em" stroke={1.5} />}
                py={0}
                h="2.25rem"
                pl="sm"
              >
                config.yml
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="settings">
              <Stack gap="xl">
                <SiteForm initialValues={data as Site} />
                <Group justify="flex-end">
                  <DeleteSiteModal site={data as Site}>
                    {(open) => (
                      <Button
                        onClick={open}
                        color="red"
                        size="sm"
                        rightSection={<IconTrash stroke={1.5} size="1.25rem" />}
                        variant="light"
                      >
                        Delete
                      </Button>
                    )}
                  </DeleteSiteModal>
                </Group>
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="manage">
              <Stack gap="xl">
                <InviteUserForm site={data as Site} />
                <CollaboratorsTable site={data as Site} />
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="install">
              <InstallConfig site={data as Site} />
            </Tabs.Panel>
          </Tabs>
        ) : (
          <Center>
            <Loader />
          </Center>
        )}
      </Stack>
    </Container>
  );
};

export default EditSitePage;
