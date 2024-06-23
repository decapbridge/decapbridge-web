import {
  TextInput,
  PasswordInput,
  Title,
  Text,
  Button,
  Stack,
  Anchor,
  Group,
  SimpleGrid,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useData } from "vike-react/useData";
import { z } from "zod";

import InternalLink from "/src/components/core/InternalLink";
import useAuthActions from "/src/hooks/useAuthActions";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import { usePageContext } from "vike-react/usePageContext";
import directus from "/src/utils/directus";
import { passwordReset, readItem, readMe, updateUser } from "@directus/sdk";
import onlyDiff from "/src/utils/onlyDiff";
import useMaybeUser from "/src/hooks/useMaybeUser";
import { useEffect } from "react";
import navigate from "/src/utils/navigate";


const errorPage = (msg: string) => (
  <Stack ta="center">
    <Title order={2}>{msg}</Title>
    <Anchor component={InternalLink} href="/auth/password/forgot">
      Back to home page
    </Anchor>
  </Stack>
)

const schema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().max(255),
  password: z.string().min(6).max(255),
});

const FinalizePage: React.FC = () => {

  const { urlParsed } = usePageContext();
  const { token, email, first_name, last_name, site_id } = urlParsed.search;

  const form = useAsyncForm({
    schema,
    initialValues: {
      first_name: first_name ?? "",
      last_name: last_name ?? "",
      email: email ?? "",
      password: "",
    },
    action: async ({ first_name, last_name, email, password }) => {
      if (!token) {
        return alert('Missing token in URL')
      }
      await directus.request(passwordReset(token, password));
      await directus.login(email, password, { mode: "json" });
      const me = await directus.request(readMe());
      if (!me) {
        return alert('Error wiht login')
      }
      await directus.request(updateUser(me.id, onlyDiff(me, {
        first_name,
        last_name,
        email
      })));
      const site = await directus.request(readItem('sites', site_id))
      if (!site) {
        return alert('You\'re not a collaborator in this site.')
      }

      const { cms_url } = site;

      window.location.href = cms_url;
    },
  });

  if (!token) {
    return errorPage('Token missing from URL');
  }

  if (!site_id) {
    return errorPage('Missing site_id in URL');
  }

  const passwordProps = form.getInputProps("password")
  return (
    <Stack w={480} gap={0}>
      <Title ta="center">Confirm account details</Title>
      <Group gap={6} justify="center" align="center">
        <Text c="dimmed" size="sm">
          Just one last thing because you can start contributing.
        </Text>
      </Group>
      <FormWrapper
        form={form}
        withBorder
        shadow="md"
        p="lg"
        my="md"
        radius="md"
      >
        <Stack>
          <SimpleGrid spacing="md" cols={{ base: 1, sm: 2 }}>
            <TextInput
              name="first_name"
              label="First name"
              {...form.getInputProps("first_name")}
              autoFocus={!first_name}
            />
            <TextInput
              name="last_name"
              label="Last name"
              {...form.getInputProps("last_name")}
            />
          </SimpleGrid>
          <TextInput
            name="email"
            label="Email"
            leftSection={<IconAt size={16} />}
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            name="password"
            label="Choose a password"
            leftSection={<IconLock size={16} />}
            required
            {...passwordProps}
            value={passwordProps.value ?? ''}
            autoFocus={Boolean(first_name)}
          />
          {form.errors.action && (
            <Group justify="center">
              {form.errors.action}
            </Group>
          )}
          <Button
            {...form.submitButtonProps}
            fullWidth
            accessKey="s"
            mt={form.errors.action ? 0 : "xs"}
          >
            Save & go to CMS
          </Button>
        </Stack>
      </FormWrapper>
    </Stack>
  );
};

export default FinalizePage;
