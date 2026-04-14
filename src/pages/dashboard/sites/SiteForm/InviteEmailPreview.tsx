import {
  Anchor,
  Avatar,
  Button,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";

interface InviteEmailPreviewProps {
  name: string;
  logo: string | null;
  color: string;
}

const InviteEmailPreview: React.FC<InviteEmailPreviewProps> = ({
  name,
  logo,
  color,
}) => {
  return (
    <Stack
      p="xl"
      gap="lg"
      style={{ pointerEvents: "none", userSelect: "none" }}
    >
      <Image
        src={logo ?? "/favicon.svg"}
        alt="Site logo"
        w={60}
        h={60}
        radius="md"
      />

      <Title order={3} fw={700}>
        You've been invited to contribute to {name}.
      </Title>

      <Text size="sm">
        Click the button below to accept this invitation, log into the Content
        Management System and start editing content:
      </Text>

      <Button
        size="lg"
        color="dark"
        radius="md"
        w="fit-content"
        px="xl"
      >
        Join {name}
      </Button>

      <Text size="sm">
        Forgot your password?{" "}
        <Anchor size="sm" c="#1a0dab" td="underline">Click here to set a new password</Anchor>.
      </Text>

      <Text size="sm">All the best,</Text>

      <Group gap="sm">
        <Avatar src={logo ?? "/favicon.svg"} size="md" color={color} />
        <Stack gap={0}>
          <Text size="sm" fw={500}>
            The {name} Team
          </Text>
          <Text size="xs" c="dimmed">
            Administrator
          </Text>
        </Stack>
      </Group>

      <Divider />

      <Text size="xs">
        Sent by the team at {name} —{" "}
        <Anchor size="xs" c="dark" td="underline">Manage Your Account</Anchor>
      </Text>
    </Stack>
  );
};

export default InviteEmailPreview;
