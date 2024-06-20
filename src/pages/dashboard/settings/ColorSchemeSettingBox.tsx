import {
  Paper,
  Title,
  Divider,
  Group,
  Switch,
  Box,
  Kbd,
  useMantineTheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useOs } from "@mantine/hooks";
import { useData } from "vike-react/useData";

import useColorSchemeToggle from "/src/hooks/useColorSchemeToggle";
import type { Data } from "./+data";

const ColorSchemeSettingBox: React.FC = () => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useColorSchemeToggle();
  const os = useOs();
  const content = useData<Data>();

  return (
    <Paper withBorder shadow="md" p="xl" my="xl" radius="md">
      <Title order={3}>{content.color_scheme_heading}</Title>
      <Divider mt="xs" />
      <Group justify="space-between" mt="md">
        <Switch
          label={content.dark_mode_toggle}
          size="lg"
          checked={colorScheme === "dark"}
          color={colorScheme === "dark" ? "gray" : "dark"}
          onLabel={
            <IconSun size={16} stroke={2.5} color={theme.colors.yellow[4]} />
          }
          offLabel={
            <IconMoonStars
              size={16}
              stroke={2.5}
              color={theme.colors.blue[6]}
            />
          }
          onChange={toggleColorScheme}
        />
        <Box mt={-4}>
          <Kbd>{os === "undetermined" || os === "macos" ? "⌘" : "Ctrl"}</Kbd>
          {" + "}
          <Kbd>J</Kbd>
        </Box>
      </Group>
    </Paper>
  );
};

export default ColorSchemeSettingBox;
