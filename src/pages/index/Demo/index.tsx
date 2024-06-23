// import { useRef } from "react";
import { Paper, Image, Container, Title, Stack } from "@mantine/core";
// import { Carousel } from '@mantine/carousel';
// import AutoHeight from 'embla-carousel-auto-height';
// import useColorSchemeToggle from "/src/hooks/useColorSchemeToggle";

// const images = [...Array(4).keys()]

const Demo: React.FC = () => {
  // const { colorScheme } = useColorSchemeToggle()
  // const autoheight = useRef(AutoHeight());
  return (
    <Container size="md">
      <Stack>
        <Title order={4} ta="center">Demo screenshot:</Title>
        <Paper withBorder shadow="xl" style={{ overflow: 'hidden' }}>
          <Image src={`/demo/screen-grab.png`} alt="DecapBridge demo" m="auto" />
          {/* <Carousel withIndicators plugins={[autoheight.current as any]}>
          {images.map(id => (
            <Carousel.Slide key={id} display="flex">
              <Image src={`/demo/demo-light-${id + 1}.png`} alt="DecapBridge demo" m="auto" />
            </Carousel.Slide>
          ))}
        </Carousel> */}
        </Paper>
      </Stack>
    </Container>
  );
};

export default Demo;
