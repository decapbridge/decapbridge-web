import { Button, Container } from "@mantine/core";
import classes from "./HeroText.module.css";
import { useData } from "vike-react/useData";
import { Data } from "../+data";
import Markdown from "/src/components/ui/Markdown";
import InternalLink from "/src/components/core/InternalLink";
import useMaybeUser from "/src/hooks/useMaybeUser";

export function HeroText() {
  const home = useData<Data>();
  const { user } = useMaybeUser();
  return (
    <Container className={classes.wrapper} size="md">
      <div className={classes.inner}>
        <Markdown className={classes["hero-text"]} markdown={home.hero_title} />
        <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            component={InternalLink}
            href={user ? "/dashboard/sites" : "/auth/signup"}
          >
            {user ? "Go to dashboard" : "Get started"}
          </Button>
          {/* <Button className={classes.control} size="lg" variant="default" color="gray">
            Self host
          </Button> */}
        </div>
      </div>
    </Container>
  );
}
