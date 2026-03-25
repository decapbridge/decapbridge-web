import {
  ActionIcon,
  Badge,
  Box,
  Button,
  ButtonProps,
  Image,
  useMantineTheme,
} from "@mantine/core";
import { PossibleLinks } from "/src/utils/types";

import InternalLink from "/src/components/core/InternalLink";

import utils from "/src/utils/utils.module.css";
import useMaybeUser from "/src/hooks/useMaybeUser";
import isProUser from "/src/utils/isProUser";
import { usePageContext } from "vike-react/usePageContext";
import useGlobalData from "/src/hooks/useGlobalData";
import { env } from "/src/utils/env";

interface LogoProps extends ButtonProps {
  href?: PossibleLinks;
  withTitle?: boolean;
}

const Logo: React.FC<LogoProps> = ({ href = "/", withTitle, ...rest }) => {
  const theme = useMantineTheme();
  const { urlPathname } = usePageContext();
  const { site } = useGlobalData();

  let title = site.site_name;
  if (theme.other.site_logo !== "/favicon.svg" || !env('VITE_DECAPBRIDGE_IS_CLOUD')) {
    title = theme.other.site_name;
  }

  const { user } = useMaybeUser();
  const showProBadge =
    user && isProUser(user) && env('VITE_DECAPBRIDGE_IS_CLOUD');
  const logo = (
    <Image src={theme.other.site_logo} w="1.5rem" aria-label={title} />
  );

  const clickableProps: any = href
    ? {
        component: InternalLink,
        href,
      }
    : {};

  const sharedProps = {
    ...clickableProps,
    variant: "transparent",
    className: utils["nav-button"],
    ...rest,
  };

  if (withTitle) {
    return (
      <Box pos="relative">
        <Button {...sharedProps} leftSection={logo} pr="sm">
          {title}
        </Button>
        {urlPathname.startsWith("/dashboard") && showProBadge && (
          <Badge
            pos="absolute"
            top={0}
            right="-0.875rem"
            size="xs"
            variant="light"
            fz="0.5rem"
            py={0}
            px={4}
          >
            Pro
          </Badge>
        )}
      </Box>
    );
  }

  return <ActionIcon {...sharedProps}>{logo}</ActionIcon>;
};

export default Logo;
