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

interface LogoProps extends ButtonProps {
  href?: PossibleLinks;
  withTitle?: boolean;
}

const Logo: React.FC<LogoProps> = ({ href = "/", withTitle, ...rest }) => {
  const theme = useMantineTheme();
  const { urlPathname } = usePageContext();

  const { user } = useMaybeUser();
  const isPro = user && isProUser(user);
  const logo = (
    <Image
      src={theme.other.site_logo}
      w="1.5rem"
      aria-label={theme.other.site_name}
    />
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
          {theme.other.site_name}
        </Button>
        {urlPathname.startsWith("/dashboard") && isPro && (
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
