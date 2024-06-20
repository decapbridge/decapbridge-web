import { ActionIcon, Group, GroupProps } from "@mantine/core";
import {
  IconExternalLink,
  IconBrandGithub,
  IconEdit,
  IconUserCircle,
  IconProps,
} from "@tabler/icons-react";
import useGlobalData from "/src/hooks/useGlobalData";

const icons: Record<string, React.FC<Omit<IconProps, "ref">>> = {
  IconExternalLink,
  IconBrandGithub,
  IconEdit,
  IconUserCircle,
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
          const Icon = icons[icon];
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
              <Icon size="1.25rem" />
            </ActionIcon>
          );
        })}
    </Group>
  );
};

export default SocialIcons;
