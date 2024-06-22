import { Paper, Image, Container } from "@mantine/core";
import useColorSchemeToggle from "/src/hooks/useColorSchemeToggle";

const Demo: React.FC = () => {
  const { colorScheme } = useColorSchemeToggle()
  return (
    <Container size="md">
      <Paper withBorder shadow="xl" style={{ overflow: 'hidden' }}>
        <Image src={`/demo/demo-${colorScheme}.png`} alt="DecapBridge demo" />
      </Paper>
    </Container>
  );
};

export default Demo;
