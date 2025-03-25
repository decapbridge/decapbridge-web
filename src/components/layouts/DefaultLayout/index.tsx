import type { ReactNode } from "react";
import { AppShell } from "@mantine/core";
import { usePageContext } from "vike-react/usePageContext";

import Header from "/src/components/misc/Header";
import Footer from "/src/components/misc/Footer";
import Navbar from "/src/components/misc/Navbar";

import SkipToContent from "/src/components/misc/SkipToContent";
import MountTransition from "/src/components/ui/MountTransition";
import useMobileMenuOpened from "/src/hooks/useMobileMenuOpened";
import { mainContentId } from "/src/utils/constants";

import styles from "./layout.module.css";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { opened } = useMobileMenuOpened();
  const { urlPathname } = usePageContext();
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
      <MountTransition key={urlPathname} keepMounted transition="fade-up">
        {(css) => (
          <AppShell.Main
            id={mainContentId}
            className={styles["main-content"]}
            style={{ opacity: 0, ...css, display: "initial" }}
          >
            {children}
          </AppShell.Main>
        )}
      </MountTransition>
      <Footer />
      <Navbar />
    </AppShell>
  );
};

export default DefaultLayout;
