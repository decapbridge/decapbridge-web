import { Box, Group, Stack } from "@mantine/core";
import { usePageContext } from "vike-react/usePageContext";
import Logo from "/src/components/misc/Logo";
import CenteredScreenLayout from "/src/components/layouts/CenteredScreenLayout";
import ColorSchemeToggle from "/src/components/ui/ColorSchemeToggle";
import MountTransition from "/src/components/ui/MountTransition";
import { mainContentId } from "/src/utils/constants";

interface DefaultCenteredLayoutProps {
  children: React.ReactNode;
}

const DefaultCenteredLayout: React.FC<DefaultCenteredLayoutProps> = ({
  children,
}) => {
  const { urlPathname } = usePageContext();
  return (
    <Stack pos="relative">
      <Group
        p="md"
        pr="xl"
        justify="space-between"
        pos="absolute"
        top={0}
        left={0}
        right={0}
      >
        <Logo href="/" withTitle />
        <ColorSchemeToggle />
      </Group>
      <CenteredScreenLayout>
        <MountTransition key={urlPathname} keepMounted transition="fade-up">
          {(css) => (
            <Box
              id={mainContentId}
              style={{ opacity: 0, ...css, display: "initial" }}
            >
              {children}
            </Box>
          )}
        </MountTransition>
      </CenteredScreenLayout>
    </Stack>
  );
};

export default DefaultCenteredLayout;
