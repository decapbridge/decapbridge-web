import {
  Title,
  Text,
  Stack,
  Anchor,
  Group,
  Paper,
  Button,
} from "@mantine/core";
import { useData } from "vike-react/useData";

import InternalLink from "/src/components/core/InternalLink";
import UserForm from "/src/components/misc/UserForm";
import type { Data } from "./+data";
import useAuthActions from "/src/hooks/useAuthActions";
import directus from "/src/utils/directus";
import { readMe, updateUser, uploadFiles } from "@directus/sdk";
import { useQueryClient } from "@tanstack/react-query";
// import PasswordStrength from "./PasswordStrength";

const SignupPage: React.FC = () => {
  const content = useData<Data>();
  const { signup } = useAuthActions();
  const queryClient = useQueryClient();

  return (
    <Stack m="auto" maw={480} m="auto">
      <Stack gap={0}>
        <Title ta="center">{content.header}</Title>
        <Group gap={6} justify="center" align="center">
          <Text c="dimmed" size="sm">
            {content.sub_header}
          </Text>
          <Anchor component={InternalLink} href="/auth/login" size="sm">
            {content.login}
          </Anchor>
        </Group>
      </Stack>
      <Paper withBorder shadow="md" p="xl" radius="lg">
        <UserForm
          type="signup"
          action={async (values) => {
            await signup({
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              password: values.password!,
            });

            if (values.avatar instanceof File) {
              const me = await directus.request(readMe());
              if (!me) {
                alert("Error with login");
                return;
              }

              const form = new FormData();
              form.append("file", values.avatar);
              const avatarFile = await directus.request(uploadFiles(form));
              await directus.request(
                updateUser(me.id, { avatar: avatarFile.id })
              );
              await queryClient.invalidateQueries({
                queryKey: ["user"],
                refetchType: "all",
              });
            }
          }}
          renderButton={(props) => (
            <Button {...props} fullWidth accessKey="s" mt="xs">
              Sign up
            </Button>
          )}
        />
      </Paper>
    </Stack>
  );
};

export default SignupPage;
