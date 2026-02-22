import { Button, Container, Group, Stack, Text } from "@mantine/core";

import useCurrentUser from "/src/hooks/useCurrentUser";
import { useState } from "react";
import { goToPortal } from "/src/utils/stripe";
import PricingTable from "/src/components/misc/PricingTable";

const BillingPage: React.FC = () => {
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const handleGoToPortal = async () => {
    try {
      setLoading(true);
      await goToPortal();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <Container size="xl" p="xl" my="md">
      <Stack gap="xl">
        <Group>
          {user.stripe_price_key ? (
            <Text size="sm" c="dimmed">
              You are currently on the <code>{user.stripe_price_key}</code>{" "}
              plan.
            </Text>
          ) : (
            <Text size="sm" c="dimmed">
              You are currently on a free account. Please consider upgrading to
              unlock all limits, use premium features and support the project!
            </Text>
          )}
        </Group>
        <PricingTable />
        {user.stripe_customer_id && (
          <Group>
            <Button onClick={handleGoToPortal} loading={loading}>
              Manage subscription
            </Button>
          </Group>
        )}
      </Stack>
    </Container>
  );
};

export default BillingPage;
