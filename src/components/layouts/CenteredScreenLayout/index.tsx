import { Container, Center } from "@mantine/core";

interface CenteredScreenLayoutProps {
  children: React.ReactNode;
}

const CenteredScreenLayout: React.FC<CenteredScreenLayoutProps> = ({ children }) => {
  return (
    <Container size="sm" p="xl">
      <Center mih="calc(100vh - 28rem)" py="xl">
        {children}
      </Center>
    </Container>
  );
};

export default CenteredScreenLayout;
