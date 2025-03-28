import { Stack } from "@mantine/core";
import { HeroBullets } from "./Hero";
import { Steps } from "./Steps";
import Roadmap from "./Roadmap";

const HomePage: React.FC = () => {
  return (
    <Stack w="100%">
      <HeroBullets />
      <Steps />
      <Roadmap />
    </Stack>
  );
};

export default HomePage;
