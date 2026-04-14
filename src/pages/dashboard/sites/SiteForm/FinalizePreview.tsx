import {
  Avatar,
  Button,
  Divider,
  Group,
  Image,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { TbLock, TbUpload } from "react-icons/tb";
import { GoogleIcon } from "/src/components/ui/GoogleIcon";
import { MicrosoftIcon } from "/src/components/ui/MicrosoftIcon";

interface FinalizePreviewProps {
  name: string;
  logo: string | null;
  color: string;
  isPkce: boolean;
}

const FinalizePreview: React.FC<FinalizePreviewProps> = ({
  name,
  logo,
  color,
  isPkce,
}) => {
  return (
    <Stack
      p="xl"
      gap="md"
      style={{ pointerEvents: "none", userSelect: "none" }}
    >
      <Group gap="xs" mb="sm">
        <Image
          src={logo ?? "/favicon.svg"}
          alt="Site logo"
          w={28}
          h={28}
          radius="sm"
        />
        <Text fw={600} size="sm">
          {logo ? name : "DecapBridge"}
        </Text>
      </Group>
      <Stack gap="xs">
        <Title ta="center" order={4}>
          Finalize your account before joining {name}
        </Title>
        {isPkce && (
          <Stack>
            <Text ta="center" c="dimmed" size="sm">
              Choose your preferred login method
              <br />
              for user@example.com:
            </Text>
            <Group justify="center">
              <Button leftSection={<GoogleIcon />} variant="default" size="xs">
                Login with Google
              </Button>
              <Button
                leftSection={<MicrosoftIcon />}
                variant="default"
                size="xs"
              >
                Login with Microsoft
              </Button>
            </Group>
            <Divider label="OR, use a password:" labelPosition="center" />
          </Stack>
        )}
      </Stack>
      <Group gap="md">
        <Stack align="center" gap="xs" py="sm">
          <Avatar size="lg" color="gray" />
          <Button
            variant="subtle"
            size="xs"
            color={color}
            rightSection={<TbUpload size="1.2em" />}
          >
            Upload picture
          </Button>
        </Stack>
        <Stack style={{ flexGrow: 1 }} gap="xs">
          <TextInput
            label="First name"
            placeholder="My first name"
            styles={{ input: { borderColor: color } }}
          />
          <TextInput label="Last name" placeholder="My last name" />
        </Stack>
      </Group>
      <PasswordInput
        label="Password"
        placeholder="Your password"
        leftSection={<TbLock size={16} />}
      />
      <Button fullWidth color={color} mt="xs">
        Save & go to CMS
      </Button>
    </Stack>
  );
};

export default FinalizePreview;
