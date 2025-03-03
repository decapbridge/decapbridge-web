import { ReactElement } from "react";
import { Menu, Text } from "@mantine/core";
import {
  TbChevronRight,
  TbActivity,
  TbSettings,
  TbLogout,
  TbUser,
} from "react-icons/tb";
import InternalLink from "/src/components/core/InternalLink";
import useCurrentUser from "/src/hooks/useCurrentUser";
import useAuthActions from "/src/hooks/useAuthActions";
import usePageMeta from "/src/hooks/usePageMeta";
import useGlobalData from "/src/hooks/useGlobalData";

const UserDropdown: React.FC<{ trigger: ReactElement }> = ({ trigger }) => {
  const user = useCurrentUser();
  const { misc } = useGlobalData();
  const { logout } = useAuthActions();
  const [templatesLink, settingsLink] = usePageMeta(
    "/dashboard/profile",
    // "/dashboard/activity",
    "/dashboard/settings"
  );

  if (!user) {
    return null;
  }

  return (
    <Menu withArrow trigger="hover" width={250} radius="lg">
      <Menu.Target>{trigger}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={InternalLink}
          style={{ textDecoration: "none" }}
          rightSection={<TbChevronRight size={14} />}
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
          leftSection={<TbUser size={14} />}
          key={templatesLink.urlPathname}
        >
          {templatesLink.title}
        </Menu.Item>
        <Menu.Divider />
        {/* <Menu.Item
          component={InternalLink}
          style={{ textDecoration: "none" }}
          href={activityLink.urlPathname}
          leftSection={<TbActivity size={14}  />}
          key={activityLink.urlPathname}
        >
          {activityLink.title}
        </Menu.Item> */}
        <Menu.Item
          component={InternalLink}
          style={{ textDecoration: "none" }}
          href={settingsLink.urlPathname}
          leftSection={<TbSettings size={14} />}
          key={settingsLink.urlPathname}
        >
          {settingsLink.title}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<TbLogout size={14} />} onClick={logout}>
          {misc.logout}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserDropdown;
