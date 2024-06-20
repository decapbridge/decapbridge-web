import { atom, useAtomValue } from "jotai";

export type TransitionState = "iddle" | "transitioning";

export const pageTransitionAtom = atom<TransitionState>("iddle");

const usePageTransitionState = () => {
  return useAtomValue(pageTransitionAtom);
};

export default usePageTransitionState;
