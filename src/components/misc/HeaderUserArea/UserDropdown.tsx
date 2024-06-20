import { ReactElement } from "react";
import { Menu, Text } from "@mantine/core";
import {
  IconChevronRight,
  IconActivity,
  IconSettings,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import InternalLink from "/src/components/core/InternalLink";
import useCurrentUser from "/src/hooks/useCurrentUser";
import useAuthActions from "/src/hooks/useAuthActions";
import usePageMeta from "/src/hooks/usePageMeta";
import useGlobalData from "/src/hooks/useGlobalData";

const UserDropdown: React.FC<{ trigger: ReactElement }> = ({ trigger }) => {
  const user = useCurrentUser();
  const { misc } = useGlobalData();
  const { logout } = useAuthActions();
  const [templatesLink, activityLink, settingsLink] = usePageMeta(
    "/dashboard/profile",
    "/dashboard/activity",
    "/dashboard/settings"
  );

  if (!user) {
    return null;
  }

  return (
    <Menu withArrow trigger="hover" width={250}>
      <Menu.Target>{trigger}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={InternalLink}
          style={{ textDecoration: "none" }}
          rightSection={<IconChevronRight size={14} stroke={1.5} />}
          href="/dashboard/profile"
        >
          <Text fw={500}>
            {user.first_name} {user.last_name}
          </Text>
          <Text size="xs" c="dimmed">
            {user.email}
          </Text>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          component={InternalLink}
          style={{ textDecoration: "none" }}
          href={templatesLink.urlPathname}
          leftSection={<IconUser size={14} stroke={1.5} />}
          key={templatesLink.urlPathname}
        >
          {templatesLink.title}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          component={InternalLink}
          style={{ textDecoration: "none" }}
          href={activityLink.urlPathname}
          leftSection={<IconActivity size={14} stroke={1.5} />}
          key={activityLink.urlPathname}
        >
          {activityLink.title}
        </Menu.Item>
        <Menu.Item
          component={InternalLink}
          style={{ textDecoration: "none" }}
          href={settingsLink.urlPathname}
          leftSection={<IconSettings size={14} stroke={1.5} />}
          key={settingsLink.urlPathname}
        >
          {settingsLink.title}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          leftSection={<IconLogout size={14} stroke={1.5} />}
          onClick={logout}
        >
          {misc.logout}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserDropdown;
