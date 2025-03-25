import type { OnPageTransitionEndAsync } from "vike/types";
import { pageTransitionAtom } from "/src/hooks/usePageTransitionState";
import store from "/src/utils/store";

export const onPageTransitionEnd: OnPageTransitionEndAsync =
   
  async (): ReturnType<OnPageTransitionEndAsync> => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        store.set(pageTransitionAtom, "iddle");
      });
    });
  };
