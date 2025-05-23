import { ActionIcon, Button, ButtonProps, Image } from "@mantine/core";
import { PossibleLinks } from "/src/utils/types";
import useGlobalData from "/src/hooks/useGlobalData";

import InternalLink from "/src/components/core/InternalLink";

import utils from "/src/utils/utils.module.css";

interface LogoProps extends ButtonProps {
  href?: PossibleLinks;
  withTitle?: boolean;
}

const Logo: React.FC<LogoProps> = ({ href, withTitle, ...rest }) => {
  const {
    site: { site_name },
  } = useGlobalData();

  const logo = (
    <Image src="/icons/favicon.svg" w="1.5rem" aria-label={site_name} />
  );

  const clickableProps: any = href
    ? {
        component: InternalLink,
        href,
      }
    : {};

  const sharedProps = {
    variant: "transparent",
    className: utils["nav-button"],
    ...rest,
  };

  if (withTitle) {
    return (
      <Button {...sharedProps} {...clickableProps} leftSection={logo} pr="sm">
        {site_name}
      </Button>
    );
  }

  return (
    <ActionIcon {...sharedProps} {...clickableProps}>
      {logo}
    </ActionIcon>
  );
};

export default Logo;
