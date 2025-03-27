import { AppShell, Button, Divider, Stack } from "@mantine/core";
import InternalLink from "/src/components/core/InternalLink";
import useGlobalData from "/src/hooks/useGlobalData";

import usePageMeta from "/src/hooks/usePageMeta";
import useMobileMenuOpened from "/src/hooks/useMobileMenuOpened";
import useMaybeUser from "/src/hooks/useMaybeUser";

import utils from "/src/utils/utils.module.css";
import styles from "./navbar.module.css";

const Navbar: React.FC = () => {
  const { close } = useMobileMenuOpened();
  const { user } = useMaybeUser();
  const publicPages = usePageMeta("/contact");
  const authedPages = usePageMeta(
    "/dashboard/sites",
    "/dashboard/profile",
    "/dashboard/activity",
    "/dashboard/settings",
    "/contact"
  );
  const pages = user ? authedPages : publicPages;
  const {
    pagesMeta: { "text-pages": textPages },
  } = useGlobalData();
  return (
    <AppShell.Navbar py="md" px="lg" className={styles.navbar}>
      <Stack gap={0} onClick={close}>
        {pages.map(({ urlPathname, title }) => (
          <Button
            key={urlPathname}
            justify="start"
            component={InternalLink}
            href={urlPathname}
            variant="transparent"
            className={utils["nav-button"]}
            size="md"
            px="sm"
          >
            {title}
          </Button>
        ))}
      </Stack>
      <Divider my="md" />
      <Stack gap={0} onClick={close}>
        {textPages.map(({ urlPathname, title }) => (
          <Button
            key={urlPathname}
            justify="start"
            component={InternalLink}
            href={urlPathname}
            variant="transparent"
            className={utils["nav-button"]}
            size="sm"
            px="sm"
          >
            {title}
          </Button>
        ))}
      </Stack>
    </AppShell.Navbar>
  );
};

export default Navbar;
