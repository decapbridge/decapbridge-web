import { ActionIcon, ActionIconProps, Tooltip } from "@mantine/core";
import { TbBrandGithub } from "react-icons/tb";

const GithubLink: React.FC<ActionIconProps> = (props) => {
  return (
    <Tooltip label="Star us on GitHub ❤️" withArrow>
      <ActionIcon
        component="a"
        href="https://github.com/decapbridge"
        aria-label="Github"
        target="_blank"
        variant="transparent"
        size="lg"
        {...props}
      >
        <TbBrandGithub size="1.25rem" />
      </ActionIcon>
    </Tooltip>
  );
};

export default GithubLink;
