import { Container, Stack } from "@mantine/core";

import ColorSchemeSettingBox from "./ColorSchemeSettingBox";
import PasswordResetSettingBox from "./PasswordResetSettingBox";
import DeleteAccountSettingBox from "./DeleteAccountSettingBox";

const SettingsPage: React.FC = () => {
  return (
    <Container size="sm" p="xl" my="md">
      <Stack>
        <ColorSchemeSettingBox />
        <PasswordResetSettingBox />
        <DeleteAccountSettingBox />
      </Stack>
    </Container>
  );
};

export default SettingsPage;
