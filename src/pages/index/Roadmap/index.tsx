import {
  Container,
  Stack,
  Title,
  Text,
  Accordion,
  Anchor,
  Group,
} from "@mantine/core";
import utils from "/src/utils/utils.module.css";
import InternalLink from "/src/components/core/InternalLink";
import useColorSchemeToggle from "/src/hooks/useColorSchemeToggle";

const items: { title: string; description: string }[] = [
  {
    title: "i18n translations",
    description:
      "Add multilingual translation to the web UI to improve world wide accessibility.",
  },
  {
    title: "Automatic Github token retrival",
    description:
      "Integrate Login with Github and token management, so you don't have to type in the repo name or create and copy-paste an access token. This could be done automatically for you in a few clicks.",
  },
  {
    title: "More SSO options",
    description:
      "Integrate Login with Apple, Okta, Auth0, Github, Gitlab and Discord.",
  },
  {
    title: "More git providers",
    description:
      "Support for more git providers, missing ones are: azure, gitea and bitbucket",
  },
];

const Roadmap: React.FC = () => {
  const { colorScheme } = useColorSchemeToggle();
  return (
    // <div className={`${utils["alt-background"]} ${utils["top-border"]}`}>
    <div className={`${utils["alt-background"]}`}>
      <Container size="xs" mb="xl" py="xl">
        <Stack gap="xl" my="xl">
          <Stack gap={4}>
            <Title order={2} ta="center">
              What's next
            </Title>
            <Text size="sm" ta="center">
              Upcoming features roadmap
            </Text>
          </Stack>
          <Accordion variant="separated">
            {items.map((i) => (
              <Accordion.Item
                px="xs"
                value={i.title}
                key={i.title}
                style={
                  colorScheme === "light"
                    ? {
                        background: "white",
                        border: `calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-gray-3)`,
                      }
                    : {}
                }
              >
                <Accordion.Control>{i.title}</Accordion.Control>
                <Accordion.Panel>{i.description}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
          <Group justify="center">
            <Anchor size="sm" component={InternalLink} href="/contact">
              Ideas? Please leave them here!
            </Anchor>
          </Group>
        </Stack>
      </Container>
    </div>
  );
};

export default Roadmap;
