import { useState } from "react";
import { Paper, Title, Text, Divider, Button } from "@mantine/core";
import { passwordRequest } from "@directus/sdk";
import { notifications } from "@mantine/notifications";
import { useData } from "vike-react/useData";

import directus from "/src/utils/directus";
import useCurrentUser from "/src/hooks/useCurrentUser";
import { getPasswordResetUrl } from "/src/utils/constants";
import type { Data } from "./+data";

const PasswordResetSettingBox: React.FC = () => {
  const user = useCurrentUser();
  const [resetPasswordSent, setResetPasswordSent] = useState(false);
  const content = useData<Data>();
  if (!user) {
    return null;
  }
  const handlePasswordReset = async () => {
    await directus.request(
      passwordRequest(
        user.email!,
        getPasswordResetUrl()
      )
    );
    setResetPasswordSent(true);
    notifications.show({
      title: content.reset_password_success_title,
      message: content.reset_password_success_message,
    });
  };
  return (
    <Paper withBorder shadow="md" p="xl" my="xl" radius="md">
      <Title order={3}>{content.reset_password_heading}</Title>
      <Divider mt="xs" />
      <Text size="sm" my="sm">
        {content.reset_password_sub_heading}
      </Text>
      <Button disabled={resetPasswordSent} onClick={handlePasswordReset}>
        {content.reset_password_button}
      </Button>
    </Paper>
  );
};

export default PasswordResetSettingBox;
