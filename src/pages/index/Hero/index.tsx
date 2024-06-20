import { Button, Container, Badge } from '@mantine/core';
import classes from './HeroText.module.css';
import { useData } from 'vike-react/useData';
import { Data } from '../+data';
import Markdown from '/src/components/ui/Markdown';
import InternalLink from '/src/components/core/InternalLink';

export function HeroText() {
  const home = useData<Data>();
  return (
    <Container className={classes.wrapper} size="sm">
      <div className={classes.inner}>
        <Markdown className={classes['hero-text']} markdown={home.hero_title} />
        <div className={classes.controls}>
          <Button className={classes.control} size="lg" component={InternalLink} href="/auth/signup">
            Get started
          </Button>
          {/* <Button className={classes.control} size="lg" variant="default" color="gray">
            Self host
          </Button> */}
        </div>
      </div>
    </Container>
  );
}