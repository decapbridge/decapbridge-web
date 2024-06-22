import { Stack } from "@mantine/core";
import { HeroText } from "./Hero";
import Demo from "./Demo";
import Roadmap from "./Roadmap";

const HomePage: React.FC = () => {
  return (
    <Stack w="100%">
      <HeroText />
      <Demo />
      <Roadmap />
    </Stack>
  );
};

export default HomePage;
