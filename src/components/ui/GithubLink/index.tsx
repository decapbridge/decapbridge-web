import { ActionIcon, ActionIconProps } from "@mantine/core";
import { TbBrandGithub } from "react-icons/tb";

const GithubLink: React.FC<ActionIconProps> = (props) => {
  return (
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
  );
};

export default GithubLink;
