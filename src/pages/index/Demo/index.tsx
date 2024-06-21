import { Paper, Image, Container } from "@mantine/core";

const Demo: React.FC = () => {
  return (
    <Container size="md">
      <Paper withBorder shadow="xl" style={{ overflow: 'hidden' }}>
        <Image src="/demo/demo-light.png" alt="DecapBridge demo" />
      </Paper>
    </Container>
  );
};

export default Demo;
