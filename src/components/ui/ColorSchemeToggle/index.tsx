import { ActionIcon, Tooltip, useComputedColorScheme } from "@mantine/core";
import { TbSun, TbMoon } from "react-icons/tb";
import { useHotkeys } from "@mantine/hooks";
import cx from "clsx";

import useColorSchemeToggle from "/src/hooks/useColorSchemeToggle";
import classes from "./toggle.module.css";

const ColorSchemeToggle: React.FC = () => {
  const { toggleColorScheme } = useColorSchemeToggle();
  const colorScheme = useComputedColorScheme();
  useHotkeys([["mod+J", toggleColorScheme]]);
  return (
    <Tooltip label={colorScheme === "dark" ? "Light mode" : "Dark mode"} withArrow>
      <ActionIcon
        onClick={toggleColorScheme}
        variant="transparent"
        size="lg"
        aria-label="Toggle color scheme"
      >
        <TbSun className={cx(classes.icon, classes.light)} />
        <TbMoon className={cx(classes.icon, classes.dark)} />
      </ActionIcon>
    </Tooltip>
  );
};

export default ColorSchemeToggle;
