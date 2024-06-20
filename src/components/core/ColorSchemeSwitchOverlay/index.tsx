/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Box } from "@mantine/core";
import useColorSchemeToggle from "/src/hooks/useColorSchemeToggle";

import styles from "./color-scheme-overlay.module.css";

export const overlayTransitionDuration = 175;

const ColorSchemeOverlay: React.FC = () => {
  const { transitionState } = useColorSchemeToggle();
  return (
    <Box
      className={styles.overlay}
      mod={{ state: transitionState }}
      __vars={{ "--transition-duration": String(overlayTransitionDuration) }}
    />
  );
};

export default ColorSchemeOverlay;
