import { ActionIcon, Group, GroupProps } from "@mantine/core";
import {
  TbExternalLink,
  TbBrandGithub,
  TbEdit,
  TbUserCircle,
} from "react-icons/tb";
import { IconBaseProps } from "react-icons/lib";
import useGlobalData from "/src/hooks/useGlobalData";

const icons: Record<string, React.FC<Omit<IconBaseProps, "ref">>> = {
  TbExternalLink,
  TbBrandGithub,
  TbEdit,
  TbUserCircle,
};

const SocialIcons: React.FC<GroupProps> = (props) => {
  const {
    misc: { social_links },
  } = useGlobalData();
  return (
    <Group gap="xs" {...props}>
      {social_links
        .filter(({ icon }) => icons[icon])
        .map(({ url, name, icon }) => {
          const Tb = icons[icon];
          return (
            <ActionIcon
              key={name}
              component="a"
              href={url}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
              variant="transparent"
              size="lg"
            >
              <Tb size="1.25rem" />
            </ActionIcon>
          );
        })}
    </Group>
  );
};

export default SocialIcons;
