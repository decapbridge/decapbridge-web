import type { ReactNode } from "react";
import { AppShell, Button, Divider, Stack } from "@mantine/core";
import { usePageContext } from "vike-react/usePageContext";

import Header from "/src/components/misc/Header";
import Footer from "/src/components/misc/Footer";

import SkipToContent from "/src/components/misc/SkipToContent";
import MountTransition from "/src/components/ui/MountTransition";
import useMobileMenuOpened from "/src/hooks/useMobileMenuOpened";
import { mainContentId } from "/src/utils/constants";

import styles from "./layout.module.css";
import utils from "/src/utils/utils.module.css";
import InternalLink from "/src/components/core/InternalLink";
import useGlobalData from "/src/hooks/useGlobalData";
import usePageMeta from "/src/hooks/usePageMeta";
import { env } from "/src/utils/env";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { urlPathname } = usePageContext();
  const { opened, close } = useMobileMenuOpened();
  const {
    pagesMeta: { legal },
  } = useGlobalData();
  const mobileMenuPages = usePageMeta(
    "/auth/login",
    "/auth/signup",
    "/auth/password/forgot",
  );
  const publicPages = !env('VITE_DECAPBRIDGE_IS_SELFHOSTED')
    ? usePageMeta("/docs/introduction", "/contact").map((p) =>
        p.urlPathname === "/docs/introduction"
          ? { ...p, title: "Documentation" }
          : p,
      )
    : [];

  return (
    <AppShell
      key="app"
      header={{ height: 52 }}
      navbar={{
        width: 224,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      className={styles.layout}
    >
      <SkipToContent id={mainContentId} />
      <Header />
      <AppShell.Navbar py="md" px="1rem">
        <Stack gap={4} onClick={close}>
          {[...mobileMenuPages, ...publicPages].map(
            ({ urlPathname, title }) => (
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
            ),
          )}
        </Stack>
        <Divider mt="auto" mb="xs" mx="-1rem" />
        <Stack gap={0} onClick={close}>
          {legal.map(({ urlPathname, title }) => (
            <Button
              key={urlPathname}
              justify="start"
              component={InternalLink}
              href={urlPathname}
              variant="transparent"
              className={utils["nav-button"]}
              size="xs"
            >
              {title}
            </Button>
          ))}
        </Stack>
      </AppShell.Navbar>
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
    </AppShell>
  );
};

export default DefaultLayout;
