import {
  Divider,
  Text,
  Paper,
  Stack,
  Title,
  Code,
  Group,
  Anchor,
} from "@mantine/core";

import { Site } from "/src/utils/directus";
import { CodeHighlight } from "@mantine/code-highlight";
import useCmsYamlConfig from "./useCmsYamlConfig";
import InternalLink from "/src/components/core/InternalLink";

interface InstallConfigProps {
  site: Site;
}

const InstallConfig: React.FC<InstallConfigProps> = ({ site }) => {
  const configYaml = useCmsYamlConfig(site);
  return (
    <Paper withBorder radius="lg" p="xl" shadow="md">
      <Stack>
        <Title order={4}>Setup Decap CMS</Title>
        <Divider />
        <Text>
          Use this following backend config in your Decap CMS{" "}
          <Code>config.yml</Code> file:
        </Text>
        <CodeHighlight
          style={{
            borderRadius: "0.5rem",
          }}
          language="yaml"
          code={configYaml}
        />
        <Group>
          <Text>
            Done? Try{" "}
            <Anchor target="_blank" href={site.cms_url}>
              logging in
            </Anchor>{" "}
            yourself and then{" "}
            <Anchor
              component={InternalLink}
              href={`/dashboard/sites/edit?tab=manage&siteId=${site.id}`}
            >
              invite users
            </Anchor>
            .
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
};

export default InstallConfig;
