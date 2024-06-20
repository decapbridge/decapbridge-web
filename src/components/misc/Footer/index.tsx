import { Container, Group, Anchor } from '@mantine/core';
import classes from './footer.module.css';
import InternalLink from '/src/components/core/InternalLink';
import Logo from '/src/components/misc/Logo';
import useGlobalData from '/src/hooks/useGlobalData';


export default function FooterSimple() {
  const {
    pagesMeta: { "text-pages": textPages },
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
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Logo withTitle />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}