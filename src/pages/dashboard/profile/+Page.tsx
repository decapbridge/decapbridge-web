import {
  Text,
  Container,
  Stack,
  Paper,
  Title,
  Divider,
  Button,
} from "@mantine/core";
import TimeAgo from "/src/components/ui/TimeAgo";
import useCurrentUser from "/src/hooks/useCurrentUser";
import UserForm from "/src/components/misc/UserForm";
import { updateUser } from "@directus/sdk";
import { notifications } from "@mantine/notifications";
import directus from "/src/utils/directus";
import onlyDiff from "/src/utils/onlyDiff";
import queryClient from "/src/utils/queryClient";

const MyProfilePage: React.FC = () => {
  const user = useCurrentUser();

  return (
    <Container size="xs" my="xl">
      <Stack>
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
        {user.last_access && (
          <Text>
            Last access: <TimeAgo span fw="bold" timestamp={user.last_access} />
          </Text>
        )}
      </Stack>
    </Container>
  );
};

export default MyProfilePage;
