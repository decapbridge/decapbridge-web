import type { ReactNode } from "react";
import { AppShell, Box, Button, Stack } from "@mantine/core";
import { usePageContext } from "vike-react/usePageContext";

import Header from "/src/components/misc/Header";
import Footer from "/src/components/misc/Footer";

import SkipToContent from "/src/components/misc/SkipToContent";
import MountTransition from "/src/components/ui/MountTransition";
import useMobileMenuOpened from "/src/hooks/useMobileMenuOpened";
import { mainContentId } from "/src/utils/constants";

import styles from "./docs.module.css";
import utils from "/src/utils/utils.module.css";
import InternalLink from "/src/components/core/InternalLink";
import usePageMeta from "/src/hooks/usePageMeta";

interface DocsLayoutProps {
  children: ReactNode;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ children }) => {
  const { urlPathname } = usePageContext();
  const { opened, close } = useMobileMenuOpened();
  const pages = usePageMeta(
    "/docs/introduction",
    "/docs/getting-started",
    "/docs/architecture",
    // "/docs/self-hosting",
    "/docs/source-available",
  );
  return (
    <AppShell
      key="app"
      header={{ height: 52 }}
      navbar={{
        width: 224,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      className={styles.layout}
    >
      <SkipToContent id={mainContentId} />
      <Header />
      <AppShell.Navbar py="md" px="1rem">
        <Stack gap={4} onClick={close}>
          {pages.map(({ urlPathname, title }) => (
            <Button
              key={urlPathname}
              justify="start"
              component={InternalLink}
              href={urlPathname}
              variant="transparent"
              className={utils["nav-button"]}
              size="sm"
            >
              {title}
            </Button>
          ))}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main id={mainContentId} className={styles["main-content"]}>
        <MountTransition key={urlPathname} keepMounted transition="fade-up">
          {(css) => (
            <Box
              style={{ flex: 1, opacity: 0, ...css, display: "initial" }}
              mb="xl"
            >
              {children}
            </Box>
          )}
        </MountTransition>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
};

export default DocsLayout;
