import { Title, Text, Stack, Container } from "@mantine/core";
import React from "react";
import PricingTable from "/src/components/misc/PricingTable";

const PricingSection: React.FC = () => {
  return (
    <Container my="xl" py="xl" maw="58rem" id="pricing">
      <Stack align="center" gap="xl">
        <Stack align="center">
          <Title order={2}>Upgraded accounts for professionals</Title>
          <Text ta="center" c="dimmed" size="sm" maw="40rem">
            DecapBridge was built as a free service for the DecapCMS community
            first and foremost, however to sustain the project's development and
            insure a reliable service, we offer upgraded subscriptions.
          </Text>
        </Stack>
        <PricingTable />
      </Stack>
    </Container>
  );
};

export default PricingSection;
