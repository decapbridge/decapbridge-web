import { ActionIcon } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useHotkeys } from "@mantine/hooks";
import cx from "clsx";

import useColorSchemeToggle from "/src/hooks/useColorSchemeToggle";
import classes from "./toggle.module.css";

const ColorSchemeToggle: React.FC = () => {
  const { toggleColorScheme } = useColorSchemeToggle();
  useHotkeys([["mod+J", toggleColorScheme]]);
  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="transparent"
      size="md"
      w={30}
      h={30}
      aria-label="Toggle color scheme"
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
};

export default ColorSchemeToggle;
