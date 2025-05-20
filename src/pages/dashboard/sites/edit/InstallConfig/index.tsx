import {
  Divider,
  Text,
  Paper,
  Stack,
  Title,
  useMantineColorScheme,
} from "@mantine/core";

import { Site } from "/src/utils/directus";
import { CodeHighlight } from "@mantine/code-highlight";
import useCmsYamlConfig from "./useCmsYamlConfig";

interface InstallConfigProps {
  site: Site;
}

const InstallConfig: React.FC<InstallConfigProps> = ({ site }) => {
  const configYaml = useCmsYamlConfig(site);
  const { colorScheme } = useMantineColorScheme();
  return (
    <Paper withBorder radius="lg" p="xl" shadow="md">
      <Stack>
        <Title order={4}>Setup Decap CMS</Title>
        <Divider />
        <Text>Use this following "backend config" in Decap CMS:</Text>
        <CodeHighlight
          style={{
            borderRadius: "0.5rem",
            background: "var(--ch-background) !important",
          }}
          language="yaml"
          code={configYaml}
        />
      </Stack>
      {colorScheme === "light" ? (
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css"
        />
      ) : (
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
        />
      )}
    </Paper>
  );
};

export default InstallConfig;
