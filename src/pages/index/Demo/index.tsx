import { useRef } from "react";
import { Paper, Image, Container, Title, Stack } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import AutoHeight from "embla-carousel-auto-height";
import Autoplay from "embla-carousel-autoplay";

import styles from "./demo.module.css";

const images = [...Array(6).keys()].map((num) => `/demo/demo-${num + 1}.png`);

const Demo: React.FC = () => {
  const autoheight = useRef(AutoHeight());
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
    <Container size="md">
      <Stack>
        <Title order={4} ta="center">
          Demo screenshots:
        </Title>
        <Paper withBorder shadow="xl" style={{ overflow: "hidden" }}>
          <Carousel
            withIndicators
            plugins={[autoheight.current, autoplay.current]}
            classNames={{
              indicator: styles.indicator,
            }}
            loop
          >
            {images.map((url) => (
              <Carousel.Slide key={url} display="flex">
                <Image src={url} alt="DecapBridge demo" m="auto" />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Paper>
      </Stack>
    </Container>
  );
};

export default Demo;
