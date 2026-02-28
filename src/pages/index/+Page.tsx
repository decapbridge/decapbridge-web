import { Center, Loader, Stack } from "@mantine/core";
import { HeroBullets } from "./Hero";
import { Steps } from "./Steps";
import Roadmap from "./Roadmap";
import PricingSection from "./PricingSection";
import useMaybeUser from "/src/hooks/useMaybeUser";
import { useEffect } from "react";
import navigate from "/src/utils/navigate";
import { env } from "/src/utils/env";

const HomePage: React.FC = () => {
  const { user } = useMaybeUser();
  useEffect(() => {
    if (env('VITE_DECAPBRIDGE_IS_SELFHOSTED')) {
      navigate(user ? "/dashboard/sites" : "/auth/login");
    }
  }, [user]);
  return (
    <Stack w="100%" gap={0}>
      {!env('VITE_DECAPBRIDGE_IS_SELFHOSTED') ? (
        <>
          <HeroBullets />
          <Steps />
          <PricingSection />
          <Roadmap />
        </>
      ) : (
        <Center py="xl" my="xl">
          <Loader />
        </Center>
      )}
    </Stack>
  );
};

export default HomePage;
