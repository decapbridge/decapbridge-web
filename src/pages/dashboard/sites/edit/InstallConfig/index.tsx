import { Divider, Text, Paper, Stack, Title } from "@mantine/core";

import { Site } from "/src/utils/directus";
import { CodeHighlight } from "@mantine/code-highlight";
import useCmsYamlConfig from "./useCmsYamlConfig";

interface InstallConfigProps {
  site: Site
}

const InstallConfig: React.FC<InstallConfigProps> = ({ site }) => {

  const configYaml = useCmsYamlConfig(site)
  return (
    <Paper withBorder radius="lg" p="xl" shadow="md">
      <Stack>
        <Title order={4}>Setup Decap CMS</Title>
        <Divider />
        <Text>Use this following "backend config" in Decap CMS:</Text>
        <CodeHighlight
          style={{ borderRadius: '0.5rem' }}
          c="var(--text-color)"
          language="yaml"
          code={configYaml}
        />
      </Stack>
    </Paper>
  );
};

export default InstallConfig;
