import { Container, Group, Anchor, Text, AppShell } from "@mantine/core";
import classes from "./footer.module.css";
import InternalLink from "/src/components/core/InternalLink";
import Logo from "/src/components/misc/Logo";
import useGlobalData from "/src/hooks/useGlobalData";
import { env } from "/src/utils/env";

export default function FooterSimple() {
  const {
    pagesMeta: { legal: textPages },
  } = useGlobalData();

  const items = textPages.map((link) => (
    <Anchor
      c="dimmed"
      component={InternalLink}
      key={link.urlPathname}
      href={link.urlPathname}
      size="sm"
    >
      {link.title}
    </Anchor>
  ));

  return (
    <AppShell.Footer className={classes.footer}>
      <Container className={classes.inner} px="xl">
        <Logo withTitle />
        {env('VITE_DECAPBRIDGE_IS_CLOUD') && (
          <Group className={classes.links}>{items}</Group>
        )}
        <Text size="sm" c="dimmed" pr="xl">
          {env('VITE_DECAPBRIDGE_IS_CLOUD') ? (
            <Anchor href="https://millisecond.studio">
              millisecond.studio
            </Anchor>
          ) : (
            <Anchor href="https://decapbridge.com">decapbridge.com</Anchor>
          )}
        </Text>
      </Container>
    </AppShell.Footer>
  );
}
