import { ActionIcon } from "@mantine/core";
import { TbSun, TbMoon } from "react-icons/tb";
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
      <TbSun className={cx(classes.icon, classes.light)} />
      <TbMoon className={cx(classes.icon, classes.dark)} />
    </ActionIcon>
  );
};

export default ColorSchemeToggle;
