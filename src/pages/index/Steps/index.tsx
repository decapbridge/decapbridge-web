import {
  Button,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import utils from "/src/utils/utils.module.css";

import classes from "./steps.module.css";
import InternalLink from "/src/components/core/InternalLink";
import useMaybeUser from "/src/hooks/useMaybeUser";

const data = [
  {
    title: "Add your DecapCMS site",
    description:
      'Create a "Site" in DecapBridge for your DecapCMS website, then link the git repository to the site.',
  },
  {
    title: (
      <>
        Update your <code className={classes.highlight}>config.yml</code>
      </>
    ),
    description:
      "Copy or follow the provided DecapCMS config.yml file that will be generated for your site.",
  },
  {
    title: "Invite users & have fun!",
    description:
      "Easily send out invitation emails to collaborators so they can join and start editing right away.",
  },
];

export function Steps() {
  const { user } = useMaybeUser();

  const items = data.map((item, i) => (
    <div className={classes.item} key={i}>
      <ThemeIcon
        variant="light"
        className={classes.itemIcon}
        size="3.5rem"
        radius="xl"
        pl="sm"
      >
        {i + 1}.
      </ThemeIcon>

      <div>
        <Text fw={700} fz="lg" className={classes.itemTitle}>
          {item.title}
        </Text>
        <Text c="dimmed">{item.description}</Text>
      </div>
    </div>
  ));

  return (
    <div className={utils["alt-background"]}>
      <Container size="lg" className={classes.wrapper}>
        <Stack align="center">
          <Title className={classes.title} order={2}>
            Get your Decap CMS authentication{" "}
            <span className={classes.highlight}>ready in seconds</span>
          </Title>
          <Container size={690} p={0}>
            <Text c="dimmed" className={classes.description}>
              Trying to decide between Netlify Auth, Auth0 with some cloud
              functions, or asking your users to create Github accounts? How
              about trying out something better. It's as easy as one-two-three:
            </Text>
          </Container>
          <SimpleGrid cols={{ base: 1, lg: 3 }} spacing={50} my="xl">
            {items}
          </SimpleGrid>
          <Group align="center" mt="sm">
            <Button
              size="lg"
              component={InternalLink}
              href={user ? "/dashboard/sites" : "/auth/signup"}
            >
              {user ? "Go to dashboard" : "Try now, it's free!"}
            </Button>
          </Group>
        </Stack>
      </Container>
    </div>
  );
}
