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
import { Site } from "/src/utils/directus";
import { useEffect } from "react";
import navigate from "/src/utils/navigate";
import {
  TbArrowLeft,
  TbBrandGithub,
  TbBrandGitlab,
  TbCode,
  TbExternalLink,
  TbSettings,
  TbTrash,
  TbUsers,
} from "react-icons/tb";
import InternalLink from "/src/components/core/InternalLink";
import CollaboratorsTable from "./CollaboratorsTable";
import fastClick from "/src/utils/fastClick";
import InstallConfig from "./InstallConfig";
import { PossibleLinks } from "/src/utils/types";
import DeleteSiteModal from "../DeleteSiteModal";
import useCurrentUser from "/src/hooks/useCurrentUser";

const defaultTab = "manage";

const EditSitePage: React.FC = () => {
  const user = useCurrentUser();
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

  const ownerId = (data?.user_created as any)?.id;
  useEffect(() => {
    if (ownerId && ownerId !== user.id) {
      navigate("/dashboard/sites");
    }
  }, [ownerId, user.id]);

  const tab = search.tab ?? defaultTab;
  const setTab = (tab: string | null) => {
    navigate(pathname as PossibleLinks, {
      queryParams: { tab: tab ?? defaultTab, siteId },
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
            leftSection={<TbArrowLeft size="1.25rem" />}
          >
            Back to all sites
          </Button>
          {data && (
            <Group>
              <Button
                component="a"
                href={`https://${data.git_provider}.com/${data.repo}`}
                variant="light"
                rightSection={
                  data.git_provider === "github" ? (
                    <TbBrandGithub size="1.375em" />
                  ) : (
                    <TbBrandGitlab size="1.375em" />
                  )
                }
              >
                {data?.repo}
              </Button>
              <Button
                component="a"
                href={data.cms_url}
                variant="light"
                rightSection={<TbExternalLink size="1.375em" />}
              >
                Go to CMS
              </Button>
            </Group>
          )}
        </Group>
        {data ? (
          <Tabs variant="pills" value={tab} onChange={setTab}>
            <Tabs.List mb="md" fw={500}>
              <Tabs.Tab
                onMouseDown={fastClick}
                value="manage"
                leftSection={<TbUsers size="1.5em" />}
                py={0}
                h="2.25rem"
                pl="sm"
              >
                Manage collaborators
              </Tabs.Tab>
              <Tabs.Tab
                onMouseDown={fastClick}
                value="install"
                leftSection={<TbCode size="1.5em" />}
                py={0}
                h="2.25rem"
                pl="sm"
              >
                config.yml
              </Tabs.Tab>
              <Tabs.Tab
                onMouseDown={fastClick}
                value="settings"
                leftSection={<TbSettings size="1.5em" />}
                py={0}
                h="2.25rem"
                pl="sm"
              >
                Settings
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="manage">
              <CollaboratorsTable site={data as Site} />
            </Tabs.Panel>
            <Tabs.Panel value="install">
              <InstallConfig site={data as Site} />
            </Tabs.Panel>
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
                        rightSection={<TbTrash size="1.25rem" />}
                        variant="light"
                      >
                        Delete
                      </Button>
                    )}
                  </DeleteSiteModal>
                </Group>
              </Stack>
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
