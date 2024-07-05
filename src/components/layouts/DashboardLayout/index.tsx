import { Box, Button, Container, Divider, Stack } from "@mantine/core";
import { usePageContext } from "vike-react/usePageContext";
import InternalLink from "/src/components/core/InternalLink";
import AuthenticatedLayout from "/src/components/layouts/AuthenticatedLayout";
import DefaultLayout from "/src/components/layouts/DefaultLayout";
import usePageMeta from "/src/hooks/usePageMeta";
import HeadingSection from "/src/components/misc/HeadingSection";

import utils from "/src/utils/utils.module.css";
import styles from "./dashboard.module.css";
import { IconCircleKey, IconGlobe } from "@tabler/icons-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { data } = usePageContext();
  const [sites, contact, ...rest] = usePageMeta(
    "/dashboard/sites",
    "/contact",
    "/dashboard/profile",
    // "/dashboard/activity",
    "/dashboard/settings"
  );
  return (
    <DefaultLayout>
      <AuthenticatedLayout>
        <Box className={styles.layout}>
          <Box className={styles.sidebar}>
            <Stack className={styles["sidebar-sticky"]} gap={4}>
              <Button
                key={sites.urlPathname}
                justify="start"
                component={InternalLink}
                href={sites.urlPathname}
                variant="transparent"
                className={utils["nav-button"]}
                size="md"
                // leftSection={(
                //   <IconCircleKey size="1.5em" stroke={1.5} />
                // )}
              >
                {sites.title}
              </Button>
              <Divider my="sm" />
              {rest.map(({ urlPathname, title }) => (
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
              <Button
                key={contact.urlPathname}
                mt="auto"
                justify="start"
                component={InternalLink}
                href={contact.urlPathname}
                variant="transparent"
                className={utils["nav-button"]}
                size="sm"
              >
                Get help
              </Button>
            </Stack>
          </Box>
          <Box className={`${utils["left-border"]} ${styles["main-area"]}`}>
            {data?.meta?.title && data?.meta?.description && (
              <HeadingSection
                title={data.meta.title}
                description={data.meta.description}
              />
            )}
            {children}
          </Box>
        </Box>
      </AuthenticatedLayout>
    </DefaultLayout>
  );
};

export default DashboardLayout;
