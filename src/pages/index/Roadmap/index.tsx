import { Container, Stack, Title, Accordion } from "@mantine/core";

const items: { title: string; description: string }[] = [
  {
    title: "Branded login pages and emails",
    description:
      "You will be able to change the colors, logos and texts of the authentication pages and invite emails on a site-per-site basis (Sign up, Sign in, Forgot password, Reset password)",
  },
  {
    title: "Deeper Github integration",
    description:
      "Integrate Login with Github and Github Apps, so you don't have to type in the repo name or create and copy-paste an access token. This could be done automatically for you.",
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
  {
    title: "Improved self hosting",
    description:
      "Ability to self host a simplified version of DecapBridge, if that's more your thing.",
  },
  {
    title: "Enterprise version",
    description:
      'While DecapBridge will remain free, we plan to offer an optional "white-label" version for large enterprises to support the development.',
  },
  {
    title: "i18n translations",
    description:
      "Add multilingual translation to the web UI to improve world wide accessibility.",
  },
];

const Roadmap: React.FC = () => {
  return (
    <Container size="xs" my="xl" py="xl">
      <Stack my="xl">
        <Title order={2} ta="center">
          Roadmap
        </Title>
        <Accordion variant="separated">
          {items.map((i) => (
            <Accordion.Item px="xs" value={i.title} key={i.title}>
              <Accordion.Control>{i.title}</Accordion.Control>
              <Accordion.Panel>{i.description}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Stack>
    </Container>
  );
};

export default Roadmap;
