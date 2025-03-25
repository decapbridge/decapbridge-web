import { atom, useAtom } from "jotai";
import { useCallback } from "react";

const mobileMenuOpened = atom<boolean>(false);

const useMobileMenuOpened = () => {
  const [opened, set] = useAtom(mobileMenuOpened);
  const open = useCallback(() => { set(true); }, [set])
  const close = useCallback(() => { set(false); }, [set])
  const toggle = useCallback(() => { set(v => !v); }, [set])
  return { opened, open, close, toggle, set };
};

export default useMobileMenuOpened;
