import { AppShell, Burger, Group, Container, Button } from "@mantine/core";
import InternalLink from "/src/components/core/InternalLink";
import HeaderUserArea from "/src/components/misc/HeaderUserArea";
import ColorSchemeToggle from "/src/components/ui/ColorSchemeToggle";
import SearchInput from "/src/components/ui/SearchInput";
import Logo from "/src/components/misc/Logo";
import usePageMeta from "/src/hooks/usePageMeta";
import useMobileMenuOpened from "/src/hooks/useMobileMenuOpened";

import utils from "/src/utils/utils.module.css";
import GithubLink from "/src/components/ui/GithubLink";
import { env } from "/src/utils/env";

const Header: React.FC = () => {
  const [docs, contact] = usePageMeta("/docs/introduction", "/contact");
  const publicPages = [{ ...docs, title: "Documentation" }, contact];
  const { opened, close, toggle } = useMobileMenuOpened();
  return (
    <AppShell.Header>
      <Container h="100%" fluid>
        <Group h="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group style={{ flex: 1 }} align="center" pos="relative" gap="1rem">
            <Group gap={4} onClick={opened ? close : undefined}>
              <Logo hiddenFrom="xs" />
              <Logo withTitle visibleFrom="xs" />
            </Group>
            {env('VITE_DECAPBRIDGE_IS_CLOUD') && (
              <Group visibleFrom="sm" gap="xs">
                {publicPages.map(({ urlPathname, title }) => (
                  <Button
                    key={urlPathname}
                    component={InternalLink}
                    href={urlPathname}
                    variant="transparent"
                    className={utils["nav-button"]}
                    size="xs"
                    fz="sm"
                  >
                    {title}
                  </Button>
                ))}
              </Group>
            )}
            <Group gap="xs" ml="auto">
              <SearchInput mr={4} />
              <ColorSchemeToggle />
              <GithubLink mr={4} />
              <HeaderUserArea />
            </Group>
          </Group>
        </Group>
      </Container>
    </AppShell.Header>
  );
};

export default Header;
