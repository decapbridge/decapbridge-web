import { Avatar, Button, Group, Loader } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import InternalLink from "/src/components/core/InternalLink";
import { usePageContext } from "vike-react/usePageContext";
import UserDropdown from "./UserDropdown";
import useMaybeUser from "/src/hooks/useMaybeUser";

const HeaderUserArea: React.FC = () => {
  const { urlPathname } = usePageContext();
  const { user } = useMaybeUser();

  // Loading
  if (user === undefined) {
    return (
      <Group>
        <Loader mr="xl" size="sm" c="gray" variant="dots" />
      </Group>
    );
  }

  // Logged in
  if (user) {
    if (urlPathname.startsWith("/dashboard")) {
      return (
        <Group>
          <UserDropdown
            trigger={<Avatar component={InternalLink} href="/dashboard/sites" />}
          />
        </Group>
      );
    } else {
      return (
        <Group>
          <UserDropdown
            trigger={
              <Button
                component={InternalLink}
                href="/dashboard/sites"
                style={{ textDecoration: "none", height: 30 }}
                rightSection={<IconChevronDown size={16} stroke={2} />}
              >
                Dashboard
              </Button>
            }
          />
        </Group>
      );
    }
  }

  // Logged out
  return (
    <Group gap="sm">
      <Button
        component={InternalLink}
        href="/auth/login"
        variant="default"
        size="xs"
        px="xs"
        fz="sm"
      >
        Log in
      </Button>
      <Button
        component={InternalLink}
        href="/auth/signup"
        size="xs"
        px="xs"
        fz="sm"
      >
        Sign up
      </Button>
    </Group>
  );
};

export default HeaderUserArea;
