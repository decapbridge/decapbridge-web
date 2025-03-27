import { Container, Stack, Title, Accordion } from "@mantine/core";

const items: { title: string; description: string }[] = [
  {
    title: "Self hostable version",
    description:
      "Ability to self host a simplified version of DecapBridge, if that's more your thing.",
  },
  {
    title: "Deeper Github integration",
    description:
      "Integrate Login with Github and Github Apps, so you don't have to type in the repo name or create and copy-paste an access token. This could be done automatically for you.",
  },
  {
    title: "Branded login pages and emails",
    description:
      "You will be able to change the colors, logos and texts of the authentication pages and invite emails on a site-per-site basis (Sign up, Sign in, Forgot password, Reset password)",
  },
  {
    title: "More git providers",
    description:
      "Support for more git providers is planned. Ideally we'd like to match Netlify: github, gitlab, azure, gitea and bitbucket",
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
              <Accordion.Panel py="xs">{i.description}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Stack>
    </Container>
  );
};

export default Roadmap;
