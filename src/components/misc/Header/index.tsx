import {
  AppShell,
  Burger,
  Group,
  Container,
  Button,
  Box,
  Badge,
} from "@mantine/core";
import InternalLink from "/src/components/core/InternalLink";
import HeaderUserArea from "/src/components/misc/HeaderUserArea";
import ColorSchemeToggle from "/src/components/ui/ColorSchemeToggle";
import SearchInput from "/src/components/ui/SearchInput";
import Logo from "/src/components/misc/Logo";
import usePageMeta from "/src/hooks/usePageMeta";
import useMobileMenuOpened from "/src/hooks/useMobileMenuOpened";

import utils from "/src/utils/utils.module.css";

const Header: React.FC = () => {
  const pages = usePageMeta("/contact");
  const { opened, close, toggle } = useMobileMenuOpened();

  return (
    <AppShell.Header>
      <Container h="100%" fluid>
        <Group h="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group style={{ flex: 1 }} align="center" pos="relative">
            <Group gap={4} onClick={opened ? close : undefined}>
              <Logo href="/" hiddenFrom="xs" />
              <Logo href="/" withTitle visibleFrom="xs" />
              <Badge
                visibleFrom="xs"
                variant="dot"
                style={{ alignSelf: "flex-start" }}
              >
                Beta
              </Badge>
            </Group>
            <Group
              visibleFrom="sm"
              gap="xs"
              // pos="absolute"
              // inset={0}
              // justify="center"
              // style={{ pointerEvents: 'none' }}
            >
              {pages.map(({ urlPathname, title }) => (
                <Button
                  key={urlPathname}
                  component={InternalLink}
                  href={urlPathname}
                  variant="transparent"
                  className={utils["nav-button"]}
                  style={{ pointerEvents: "all" }}
                  size="xs"
                  px="xs"
                  fz="sm"
                >
                  {title}
                </Button>
              ))}
            </Group>
            <Group gap="xs" ml="auto">
              <SearchInput mr={4} />
              <ColorSchemeToggle />
              <HeaderUserArea />
            </Group>
          </Group>
        </Group>
      </Container>
    </AppShell.Header>
  );
};

export default Header;
