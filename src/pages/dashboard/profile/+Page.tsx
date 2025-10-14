import {
  Text,
  Container,
  Stack,
  Paper,
  Title,
  Divider,
  Button,
  Group,
} from "@mantine/core";
import TimeAgo from "/src/components/ui/TimeAgo";
import useCurrentUser from "/src/hooks/useCurrentUser";
import UserForm from "/src/components/misc/UserForm";
import { updateUser } from "@directus/sdk";
import { notifications } from "@mantine/notifications";
import directus from "/src/utils/directus";
import onlyDiff from "/src/utils/onlyDiff";
import queryClient from "/src/utils/queryClient";
import {
  TbBrandGoogleFilled,
  TbBrandWindowsFilled,
  TbPassword,
} from "react-icons/tb";

const MyProfilePage: React.FC = () => {
  const user = useCurrentUser();

  return (
    <Container size="xs" my="xl">
      <Stack gap="xl">
        <Paper withBorder shadow="md" p="xl" radius="lg">
          <Title order={3}>Edit profile</Title>
          <Divider my="sm" />
          <UserForm
            type="update"
            initialValues={user}
            action={async (values) => {
              await directus.request(
                updateUser(user.id, onlyDiff(user, values))
              );
              await queryClient.invalidateQueries({
                queryKey: ["user"],
                refetchType: "all",
              });
              notifications.show({
                color: "green",
                message: "Changes saved.",
              });
            }}
            renderButton={(props) => (
              <Button {...props} accessKey="s" mt="xs">
                Save changes
              </Button>
            )}
          />
        </Paper>
        <Stack>
          {user.last_access && (
            <Text>
              Last access:{" "}
              <TimeAgo span fw="bold" timestamp={user.last_access} />
            </Text>
          )}
          <Group gap="sm">
            <Text>Login method:</Text>
            {user.provider === "google" ? (
              <Group gap={8}>
                <TbBrandGoogleFilled size="1.5rem" />
                <Text fw="bold">Google login</Text>
              </Group>
            ) : user.provider === "microsoft" ? (
              <Group gap={8}>
                <TbBrandWindowsFilled size="1.5rem" />
                <Text fw="bold">Microsoft login</Text>
              </Group>
            ) : (
              <Group gap={8}>
                <TbPassword size="1.5rem" />
                <Text fw="bold">Password login</Text>
              </Group>
            )}
          </Group>
        </Stack>
      </Stack>
    </Container>
  );
};

export default MyProfilePage;
