import { TbCheck } from "react-icons/tb";
import {
  Button,
  Container,
  Group,
  List,
  Paper,
  Text,
  ThemeIcon,
  Title,
  Image,
} from "@mantine/core";
import classes from "./HeroText.module.css";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import AutoHeight from "embla-carousel-auto-height";
import { useRef } from "react";
import InternalLink from "/src/components/core/InternalLink";
import useMaybeUser from "/src/hooks/useMaybeUser";

const images = [...Array(6).keys()].map(
  (num) => `/demo/demo-${String(num + 1)}.png`
);

export function HeroBullets() {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const autoheight = useRef(AutoHeight());
  const { user } = useMaybeUser();
  return (
    <Container size="xl" px="xl">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title fz="2.5rem">
            Standalone accounts for
            <span className={classes.highlight}>Decap CMS</span>
          </Title>
          <Text c="dimmed" mt="md" maw="36rem">
            You're using Decap CMS with GitHub, but don't want to have to ask
            users to create GitHub accounts? You also don't want to use Netlify
            or set up your own authentication service? This is just what you
            need.
          </Text>

          <List
            maw="26rem"
            mt="1.25rem"
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <TbCheck size="0.875rem" stroke="white" />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Quick email-based invites</b> - Quickly shoot out email invites
              to let collaborators edit your DecapCMS sites.
            </List.Item>
            <List.Item>
              <b>Simple user management</b> - Invite or kick out collaborators
              from your site with an intuitive interface.
            </List.Item>
            <List.Item>
              <b>Smooth onboarding experience</b> - Familiar authentication
              experience with password reset and recovery.
            </List.Item>
          </List>

          <Group mt="1.75rem">
            <Button
              radius="xl"
              size="lg"
              className={classes.control}
              component={InternalLink}
              href={user ? "/dashboard/sites" : "/auth/signup"}
            >
              {user ? "Go to dashboard" : "Get started now for free"}
            </Button>
            {/* <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Source code
            </Button> */}
          </Group>
        </div>
        <Paper
          withBorder
          shadow="xl"
          style={{ overflow: "hidden" }}
          maw="36rem"
          w="100%"
        >
          <Carousel
            withIndicators
            plugins={[autoplay.current, autoheight.current]}
            classNames={{
              indicator: classes.indicator,
            }}
            loop
          >
            {images.map((url) => (
              <Carousel.Slide key={url} display="flex">
                <Image src={url} alt="DecapBridge demo" m="auto" flex={1} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Paper>
      </div>
    </Container>
  );
}
