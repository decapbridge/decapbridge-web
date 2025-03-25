import type { OnPageTransitionStartAsync } from "vike/types";
import { pageTransitionAtom } from "/src/hooks/usePageTransitionState";
import store from "/src/utils/store";

export const onPageTransitionStart: OnPageTransitionStartAsync =
   
  async (): ReturnType<OnPageTransitionStartAsync> => {
    if (store.get(pageTransitionAtom) === "iddle") {
      store.set(pageTransitionAtom, "transitioning");
    }
  };
