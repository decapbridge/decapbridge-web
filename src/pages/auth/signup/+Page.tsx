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
// import PasswordStrength from "./PasswordStrength";

const SignupPage: React.FC = () => {
  const content = useData<Data>();
  const { signup } = useAuthActions();

  return (
    <Stack w={480}>
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
