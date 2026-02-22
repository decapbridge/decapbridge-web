import { Container, Group, Anchor, Text, AppShell } from "@mantine/core";
import classes from "./footer.module.css";
import InternalLink from "/src/components/core/InternalLink";
import Logo from "/src/components/misc/Logo";
import useGlobalData from "/src/hooks/useGlobalData";

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
        {!import.meta.env.VITE_DECAPBRIDGE_IS_SELFHOSTED && (
          <Group className={classes.links}>{items}</Group>
        )}
        <Text size="sm" c="dimmed" pr="xl">
          {import.meta.env.VITE_DECAPBRIDGE_IS_SELFHOSTED ? (
            <Anchor href="https://decapbridge.com">decapbridge.com</Anchor>
          ) : (
            <Anchor href="https://millisecond.studio">
              millisecond.studio
            </Anchor>
          )}
        </Text>
      </Container>
    </AppShell.Footer>
  );
}
