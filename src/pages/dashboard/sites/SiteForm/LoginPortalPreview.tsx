import {
  Anchor,
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
import { TbAt, TbLock } from "react-icons/tb";
import { GoogleIcon } from "/src/components/ui/GoogleIcon";
import { MicrosoftIcon } from "/src/components/ui/MicrosoftIcon";

interface LoginPortalPreviewProps {
  name: string;
  logo: string | null;
  color: string;
}

const LoginPortalPreview: React.FC<LoginPortalPreviewProps> = ({
  name,
  logo,
  color,
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
      <Title ta="center" order={4}>
        Sign into {name}
      </Title>
      <Group grow>
        <Button leftSection={<GoogleIcon />} variant="default" size="xs">
          Google
        </Button>
        <Button leftSection={<MicrosoftIcon />} variant="default" size="xs">
          Microsoft
        </Button>
      </Group>
      <Divider label="Or continue with email" labelPosition="center" />
      <TextInput
        label="Email"
        placeholder="email@example.com"
        leftSection={<TbAt size={16} />}
        styles={{ input: { borderColor: color } }}
      />
      <Group pos="relative" w="100%">
        <PasswordInput
          w="100%"
          label="Password"
          placeholder="Your password"
          leftSection={<TbLock size={16} />}
        />
        <Anchor size="xs" pos="absolute" top={4} right={0} c={color}>
          Forgot password?
        </Anchor>
      </Group>
      <Button fullWidth color={color}>
        Sign into CMS
      </Button>
    </Stack>
  );
};

export default LoginPortalPreview;
