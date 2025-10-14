import { Title, Text, Group, Stack, Anchor } from "@mantine/core";
import { useData } from "vike-react/useData";

import InternalLink from "/src/components/core/InternalLink";
import type { Data } from "./+data";
import LoginForm from "/src/components/misc/LoginForm";
import { usePageContext } from "vike-react/usePageContext";

const LoginPage: React.FC = () => {
  const content = useData<Data>();

  const { urlParsed } = usePageContext();

  const isPkceFlow =
    urlParsed.search["site_id"] &&
    urlParsed.search["state"] &&
    urlParsed.search["redirect_uri"];

  return (
    <Stack m="auto" maw={420} gap={0}>
      {urlParsed.search["site_name"] ? (
        <>
          <Title ta="center" order={2}>
            Sign into
          </Title>
          <Title ta="center" order={3}>
            <code>{urlParsed.search["site_name"]}</code>
          </Title>
        </>
      ) : (
        <Title ta="center">{content.header}</Title>
      )}
      {!isPkceFlow && (
        <Group mt={4} gap={6} justify="center" align="center">
          <Text c="dimmed" size="sm">
            {content.sub_header}
          </Text>
          <Anchor component={InternalLink} href="/auth/signup" size="sm">
            {content.create_account}
          </Anchor>
        </Group>
      )}
      <LoginForm />
    </Stack>
  );
};

export default LoginPage;
