import { Avatar, AvatarProps } from "@mantine/core";
import { CustomSchema } from "/src/utils/directus";
import getAvatarUrl from "/src/utils/getAvatarUrl";

interface UserAvatarProps extends AvatarProps {
  user: CustomSchema["directus_users"][number];
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => {
  const avatarUrl = getAvatarUrl(user?.avatar);
  const name = user ? `${user.first_name} ${user.last_name}` : undefined;
  return (
    <Avatar src={avatarUrl} name={name} color={user && "initials"} {...props} />
  );
};

export default UserAvatar;
