import type { ReactNode } from "react";
import { AppShell, Box } from "@mantine/core";

import Header from "/src/components/misc/Header";
import Footer from "/src/components/misc/Footer";
import Navbar from "/src/components/misc/Navbar";

import SkipToContent from "/src/components/misc/SkipToContent";
import usePageTransitionState from "/src/hooks/usePageTransitionState";
import useMobileMenuOpened from "/src/hooks/useMobileMenuOpened";
import { mainContentId } from "/src/utils/constants";

import utils from "/src/utils/utils.module.css";
import styles from "./layout.module.css";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { opened } = useMobileMenuOpened()
  return (
    <AppShell
      header={{ height: 52 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      className={styles.layout}
    >
      <SkipToContent id={mainContentId} />
      <Header />
      <AppShell.Main
        id={mainContentId}
        className={styles["main-content"]}
      >
        {children}
      </AppShell.Main>
      <Footer />
      <Navbar />
    </AppShell>
  );
};

export default DefaultLayout;
