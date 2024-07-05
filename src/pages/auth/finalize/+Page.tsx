import {
  Title,
  Text,
  Stack,
  Anchor,
  Group,
  Paper,
  Button,
} from "@mantine/core";
import { passwordReset, readItem, readMe, updateUser } from "@directus/sdk";
import { usePageContext } from "vike-react/usePageContext";
import { z } from "zod";

import InternalLink from "/src/components/core/InternalLink";
import UserForm from "/src/components/misc/UserForm";
import useAsyncForm from "/src/hooks/useAsyncForm";
import directus from "/src/utils/directus";
import onlyDiff from "/src/utils/onlyDiff";

const errorPage = (msg: string) => (
  <Stack ta="center">
    <Title order={2}>{msg}</Title>
    <Anchor component={InternalLink} href="/auth/password/forgot">
      Back to home page
    </Anchor>
  </Stack>
);

const FinalizePage: React.FC = () => {
  const { urlParsed } = usePageContext();
  const { token, email, first_name, last_name, site_id } = urlParsed.search;
  if (!token) {
    return errorPage("Token missing from URL");
  }
  if (!site_id) {
    return errorPage("Missing site_id in URL");
  }
  return (
    <Stack w={480}>
      <Stack gap={0}>
        <Title ta="center">Confirm account details</Title>
        <Group gap={6} justify="center" align="center">
          <Text c="dimmed" size="sm">
            Just one last thing because you can start contributing.
          </Text>
        </Group>
      </Stack>
      <Paper withBorder shadow="md" p="xl" radius="lg">
        <UserForm
          type="finalize"
          initialValues={{
            email,
            first_name,
            last_name,
            password: "",
          }}
          action={async (values) => {
            if (!token) {
              return alert("Missing token in URL");
            }
            await directus.request(passwordReset(token, values.password!));
            await directus.login(values.email, values.password!, {
              mode: "json",
            });
            const me = await directus.request(readMe());
            if (!me) {
              return alert("Error wiht login");
            }
            await directus.request(
              updateUser(
                me.id,
                onlyDiff(me, {
                  first_name: values.first_name,
                  last_name: values.last_name,
                })
              )
            );
            const site = await directus.request(readItem("sites", site_id));
            if (!site) {
              return alert("You're not a collaborator in this site.");
            }

            const { cms_url } = site;

            window.location.href = cms_url;
          }}
          renderButton={(props) => (
            <Button {...props} fullWidth accessKey="s" mt="xs">
              Save & go to CMS
            </Button>
          )}
        />
      </Paper>
    </Stack>
  );
};

export default FinalizePage;
