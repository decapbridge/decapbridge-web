import { Button, Container, Divider, Paper, Title } from "@mantine/core";
import { TbSend } from "react-icons/tb";
import { customEndpoint } from "@directus/sdk";
import { useQueryClient } from "@tanstack/react-query";
import directus, { Site } from "/src/utils/directus";
import UserForm from "/src/components/misc/UserForm";
import { notifications } from "@mantine/notifications";

interface InviteUserFormProps {
  site: Site;
}

const InviteUserForm: React.FC<InviteUserFormProps> = ({ site }) => {
  const queryClient = useQueryClient();

  return (
    <Paper withBorder shadow="md" p="xl" radius="lg">
      <Title order={4}>Invite collaborators by email</Title>
      <Divider my="md" />
      <Container size="xs">
        <UserForm
          type="invite"
          action={async (values) => {
            try {
              await directus.request(
                customEndpoint({
                  method: "POST",
                  path: `/sites/${site.id}/invite`,
                  body: JSON.stringify(values),
                })
              );
              notifications.show({
                message: "Invite email sent!",
              });
            } catch (error) {
              if ((error as any).errors) {
                notifications.show({
                  message: (error as any).errors.error_description,
                });
              }
            }
            await queryClient.invalidateQueries({ queryKey: ["sites"] });
          }}
          renderButton={(props) => (
            <Button
              {...props}
              accessKey="s"
              mt="xs"
              rightSection={<TbSend size="1.5em" />}
            >
              Send invitation email
            </Button>
          )}
        />
      </Container>
    </Paper>
  );
};

export default InviteUserForm;
