import { Avatar, AvatarProps, Tooltip } from "@mantine/core";
import { CustomSchema } from "/src/utils/directus";
import getImageUrl from "/src/utils/getImageUrl";

interface UserAvatarProps extends AvatarProps {
  user: CustomSchema["directus_users"][number];
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => {
  const avatarUrl = getImageUrl(user?.avatar);
  const name = user?.first_name
    ? `${user.first_name} ${user.last_name}`
    : (user.email ?? user.id);
  return (
    <Tooltip label={name}>
      <Avatar
        src={avatarUrl}
        name={name}
        color={user && "initials"}
        {...props}
      />
    </Tooltip>
  );
};

export default UserAvatar;
