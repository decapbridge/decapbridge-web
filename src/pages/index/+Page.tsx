import { Stack } from "@mantine/core";
import { HeroText } from "./Hero";
import Demo from "./Demo";

const HomePage: React.FC = () => {
  return (
    <Stack w="100%">
      <HeroText />
      <Demo />
    </Stack>
  );
};

export default HomePage;
