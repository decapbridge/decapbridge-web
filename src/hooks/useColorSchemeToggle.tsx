import { useCallback } from "react";
import { atom, useAtom } from "jotai";
import { MantineColorScheme, useMantineColorScheme } from "@mantine/core";
import { overlayTransitionDuration } from "/src/components/core/ColorSchemeSwitchOverlay";
import sleep from "/src/utils/sleep";

type OverlayColor = Exclude<MantineColorScheme, "auto">;

type TransitionState =
  | "iddle"
  | `start-${OverlayColor}`
  | `end-${OverlayColor}`;

const colorSchemeTransitionAtom = atom<TransitionState>("iddle");

const useColorSchemeToggle = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [transitionState, setTransitionState] = useAtom(
    colorSchemeTransitionAtom
  );

  const disabled = transitionState !== "iddle";

  const toggleColorScheme = useCallback(async () => {
    if (!disabled) {
      const targetColorScheme = colorScheme === "light" ? "dark" : "light";
      setTransitionState(`start-${targetColorScheme}`);
      await sleep(overlayTransitionDuration);
      setColorScheme(targetColorScheme);
      await sleep(0); // Wait for re-render
      setTransitionState(`end-${targetColorScheme}`);
      await sleep(overlayTransitionDuration + 100);
      setTransitionState("iddle");
    }
  }, [setTransitionState, disabled, colorScheme, setColorScheme]);

  return {
    colorScheme,
    transitionState,
    toggleColorScheme,
  };
};

export default useColorSchemeToggle;
