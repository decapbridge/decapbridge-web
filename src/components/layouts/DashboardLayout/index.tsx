import type { ReactNode } from "react";
import { AppShell, Box, Button, Divider, Stack } from "@mantine/core";
import { usePageContext } from "vike-react/usePageContext";

import Header from "/src/components/misc/Header";
import Footer from "/src/components/misc/Footer";

import SkipToContent from "/src/components/misc/SkipToContent";
import MountTransition from "/src/components/ui/MountTransition";
import useMobileMenuOpened from "/src/hooks/useMobileMenuOpened";
import { mainContentId } from "/src/utils/constants";

import styles from "./dashboard.module.css";
import utils from "/src/utils/utils.module.css";
import InternalLink from "/src/components/core/InternalLink";
import usePageMeta from "/src/hooks/usePageMeta";
import {
  TbList,
  TbUser,
  TbRocket,
  TbReceipt,
  TbActivity,
  TbSettings,
  TbLogout,
} from "react-icons/tb";
import HeadingSection from "/src/components/misc/HeadingSection";
import useMaybeUser from "/src/hooks/useMaybeUser";
import AuthenticatedLayout from "/src/components/layouts/AuthenticatedLayout";
import useAuthActions from "/src/hooks/useAuthActions";
import { env } from "/src/utils/env";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { data, urlPathname } = usePageContext();
  const { user } = useMaybeUser();
  const { logout } = useAuthActions();
  const { opened, close } = useMobileMenuOpened();
  const [sites, profile, billing, activity, settings] = usePageMeta(
    "/dashboard/sites",
    "/dashboard/profile",
    "/dashboard/billing",
    "/dashboard/activity",
    "/dashboard/settings",
  );
  return (
    <AuthenticatedLayout>
      <AppShell
        header={{ height: 52 }}
        navbar={{
          width: 224,
          breakpoint: "sm",
          collapsed: { desktop: false, mobile: !opened },
        }}
        className={styles.layout}
      >
        <SkipToContent id={mainContentId} />
        <Header />
        <AppShell.Navbar py="md" px="1rem">
          <Stack gap={4} onClick={close} flex={1}>
            <Button
              key={sites.urlPathname}
              justify="start"
              component={InternalLink}
              href={sites.urlPathname}
              leftSection={<TbList strokeWidth={1.5} size="1.5rem" />}
              variant="transparent"
              className={utils["nav-button"]}
              size="sm"
            >
              {sites.title}
            </Button>
            <Divider my="xs" mx="-1rem" />
            <Button
              key={profile.urlPathname}
              justify="start"
              component={InternalLink}
              href={profile.urlPathname}
              leftSection={<TbUser strokeWidth={1.5} size="1.25rem" />}
              variant="transparent"
              className={utils["nav-button"]}
              size="sm"
            >
              {profile.title}
            </Button>
            <Button
              key={activity.urlPathname}
              justify="start"
              component={InternalLink}
              href={activity.urlPathname}
              leftSection={<TbActivity strokeWidth={1.5} size="1.25rem" />}
              variant="transparent"
              className={utils["nav-button"]}
              size="sm"
            >
              {activity.title}
            </Button>
            {!env('VITE_DECAPBRIDGE_IS_SELFHOSTED') && (
              <Button
                key={billing.urlPathname}
                justify="start"
                component={InternalLink}
                href={billing.urlPathname}
                leftSection={
                  user?.stripe_customer_id ? (
                    <TbReceipt strokeWidth={1.5} size="1.25rem" />
                  ) : (
                    <TbRocket strokeWidth={1.5} size="1.25rem" />
                  )
                }
                variant="transparent"
                className={utils["nav-button"]}
                size="sm"
              >
                {user?.stripe_customer_id ? billing.title : "Upgrades"}
              </Button>
            )}
            <Button
              key={settings.urlPathname}
              justify="start"
              component={InternalLink}
              href={settings.urlPathname}
              leftSection={<TbSettings strokeWidth={1.5} size="1.25rem" />}
              variant="transparent"
              className={utils["nav-button"]}
              size="sm"
            >
              {settings.title}
            </Button>
            <Divider mt="auto" mb="xs" mx="-1rem" />
            <Button
              justify="start"
              leftSection={<TbLogout strokeWidth={1.5} size="1.25rem" />}
              variant="transparent"
              className={utils["nav-button"]}
              size="sm"
              onClick={logout}
            >
              Logout
            </Button>
          </Stack>
        </AppShell.Navbar>
        <AppShell.Main id={mainContentId} className={styles["main-content"]}>
          {data?.meta?.title && data?.meta?.description && (
            <HeadingSection
              title={data.meta.title}
              description={data.meta.description}
            />
          )}
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
    </AuthenticatedLayout>
  );
};

export default DashboardLayout;
