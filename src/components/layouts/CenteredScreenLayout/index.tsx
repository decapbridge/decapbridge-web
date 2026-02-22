import { Container, Center } from "@mantine/core";

interface CenteredScreenLayoutProps {
  children: React.ReactNode;
}

const CenteredScreenLayout: React.FC<CenteredScreenLayoutProps> = ({
  children,
}) => {
  return (
    <Container
      size="sm"
      p="xl"
      my="xl"
      display="flex"
      style={{ flexDirection: "column" }}
      flex={1}
    >
      <Center flex="1" py="xl" mb="4rem">
        {children}
      </Center>
    </Container>
  );
};

export default CenteredScreenLayout;
