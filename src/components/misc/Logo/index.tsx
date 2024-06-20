import { ActionIcon, Button, ButtonProps } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { PossibleLinks } from "/src/utils/types";
import useGlobalData from "/src/hooks/useGlobalData";

import InternalLink from "/src/components/core/InternalLink";

import utils from "/src/utils/utils.module.css";

interface LogoProps extends ButtonProps {
  href?: PossibleLinks;
  withTitle?: boolean;
}

const Logo: React.FC<LogoProps> = ({ href, withTitle, ...rest }) => {

  const { site: { site_name } } = useGlobalData()

  const logo = (
    <IconHome stroke={1.5} size="1.375rem" aria-label={site_name} />
  )

  const clickableProps: any = href ? {
    component: InternalLink,
    href
  } : {}

  const sharedProps = {
    variant: "transparent",
    className: utils["nav-button"],
    ...rest
  }

  if (withTitle) {
    return (
      <Button
        {...sharedProps}
        {...clickableProps}
        leftSection={logo}
      >
        {site_name}
      </Button>
    )
  }

  return (
    <ActionIcon
      {...sharedProps}
      {...clickableProps}
    >
      {logo}
    </ActionIcon>
  )
}

export default Logo;
