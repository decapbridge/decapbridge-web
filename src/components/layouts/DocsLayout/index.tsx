import { Box, Button, Stack } from "@mantine/core";
import InternalLink from "/src/components/core/InternalLink";
import DefaultLayout from "/src/components/layouts/DefaultLayout";
import usePageMeta from "/src/hooks/usePageMeta";

import utils from "/src/utils/utils.module.css";
import styles from "./docs.module.css";

interface DocsLayoutProps {
  children: React.ReactNode;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ children }) => {
  const pages = usePageMeta(
    "/docs/introduction",
    "/docs/getting-started",
    "/docs/source-available"
  );
  return (
    <DefaultLayout>
      <Box className={styles.layout}>
        <Box className={styles.sidebar}>
          <Stack className={styles["sidebar-sticky"]} gap={4}>
            {pages.map((page) => (
              <Button
                key={page.urlPathname}
                justify="start"
                component={InternalLink}
                href={page.urlPathname}
                variant="transparent"
                className={utils["nav-button"]}
                radius="sm"
                size="sm"
                px="sm"
              >
                {page.title}
              </Button>
            ))}
          </Stack>
        </Box>
        <Box className={`${utils["left-border"]} ${styles["main-area"]}`}>
          {children}
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default DocsLayout;
