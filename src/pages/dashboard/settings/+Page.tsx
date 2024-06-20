import { Container } from "@mantine/core";

import ColorSchemeSettingBox from "./ColorSchemeSettingBox";
import PasswordResetSettingBox from "./PasswordResetSettingBox";
import DeleteAccountSettingBox from "./DeleteAccountSettingBox";

const SettingsPage: React.FC = () => {
  return (
    <Container size="sm" py="xs" my="xl">
      <ColorSchemeSettingBox />
      <PasswordResetSettingBox />
      <DeleteAccountSettingBox />
    </Container>
  );
};

export default SettingsPage;
