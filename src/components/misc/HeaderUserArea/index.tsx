import { ActionIcon, Avatar, Button, Group, Loader } from "@mantine/core";
import { TbChevronDown } from "react-icons/tb";
import InternalLink from "/src/components/core/InternalLink";
import { usePageContext } from "vike-react/usePageContext";
import UserDropdown from "./UserDropdown";
import UserAvatar from "/src/components/misc/UserAvatar";
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
    return (
      <Group>
        <UserDropdown
          trigger={
            <ActionIcon
              variant="transparent"
              component={InternalLink}
              href="/dashboard/sites"
              p={0}
              size="lg"
            >
              <UserAvatar user={user} />
            </ActionIcon>
          }
        />
      </Group>
    );
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
