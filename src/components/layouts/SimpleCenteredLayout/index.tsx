import CenteredScreenLayout from "/src/components/layouts/CenteredScreenLayout";
import { Group, Stack } from "@mantine/core";
import Logo from "/src/components/misc/Logo";
import ColorSchemeToggle from "../../ui/ColorSchemeToggle";
import SearchInput from "../../ui/SearchInput";

interface DefaultCenteredLayoutProps {
  children: React.ReactNode;
}

const DefaultCenteredLayout: React.FC<DefaultCenteredLayoutProps> = ({ children }) => {
  return (
    <Stack>
      <Group p="md" pr="xl" justify="space-between">
        <Logo
          href="/"
          withTitle
        />
        <ColorSchemeToggle />
      </Group>
      <CenteredScreenLayout>
        {children}
      </CenteredScreenLayout>
    </Stack>
  );
};

export default DefaultCenteredLayout;
