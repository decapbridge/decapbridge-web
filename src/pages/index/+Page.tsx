import { Stack } from "@mantine/core";
import { HeroBullets } from "./Hero";
import { Steps } from "./Steps";
import Roadmap from "./Roadmap";
// import PricingSection from "./PricingSection";

const HomePage: React.FC = () => {
  return (
    <Stack w="100%" gap={0}>
      <HeroBullets />
      <Steps />
      {!import.meta.env.VITE_DECAPBRIDGE_IS_SELFHOSTED && (
        <>
          {/* <PricingSection /> */}
          <Roadmap />
        </>
      )}
    </Stack>
  );
};

export default HomePage;
