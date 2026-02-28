import {
  SimpleGrid,
  CardProps,
  Card,
  Title,
  Text,
  Button,
  Stack,
  Group,
  List,
  Divider,
  Badge,
  useMantineTheme,
} from "@mantine/core";
import InternalLink from "/src/components/core/InternalLink";
import useMaybeUser from "/src/hooks/useMaybeUser";
import React, { useState } from "react";
import { StripePriceKey, goToCheckout, goToPortal } from "/src/utils/stripe";
import useColorSchemeToggle from "/src/hooks/useColorSchemeToggle";
import { useMounted } from "@mantine/hooks";
import utils from "/src/utils/utils.module.css";
import { TbHeartFilled } from "react-icons/tb";
import { freeCollaboratorLimit, freeSitesLimit } from "/src/utils/freeLimits";

const StripeButton: React.FC<{
  priceKey: StripePriceKey;
  planName: string;
}> = ({ priceKey, planName }) => {
  const { user } = useMaybeUser();
  const [loading, setLoading] = useState(false);
  // const isCurrentPlan = user?.stripe_price_key === priceKey;

  const handleCheckout = async () => {
    try {
      setLoading(true);
      if (user.stripe_customer_id) {
        await goToPortal();
      } else {
        await goToCheckout(priceKey);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Button
        fullWidth
        variant="filled"
        // variant={priceKey === "lifetime" ? "gradient" : "filled"}
        // gradient={{ from: "#ff0080", to: "#683bab", deg: 160 }}
        component={InternalLink}
        href={`/auth/signup?plan=${priceKey}`}
      >
        Sign up with {planName}
      </Button>
    );
  }

  if (!user.stripe_customer_id) {
    return (
      <Button
        fullWidth
        variant="filled"
        onClick={handleCheckout}
        loading={loading}
      >
        {priceKey === "lifetime" ? "Buy a" : "Upgrade to"} {planName}
      </Button>
    );
  }

  return (
    <Button
      fullWidth
      variant="light"
      onClick={handleCheckout}
      loading={loading}
    >
      Manage plans
    </Button>
  );
};

interface PricingCardProps extends CardProps {
  name: string;
  price: number;
  priceKey?: StripePriceKey;
  description: React.ReactNode;
  quotas: React.ReactNode;
}
const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  priceKey,
  description,
  quotas,
  ...cardProps
}) => {
  const { colorScheme } = useColorSchemeToggle();
  const mounted = useMounted();
  const { user } = useMaybeUser();
  const theme = useMantineTheme();
  const isCurrentPlan = Boolean(
    user?.stripe_price_key && user?.stripe_price_key === priceKey,
  );
  return (
    <Card
      withBorder={mounted && (colorScheme === "light" || isCurrentPlan)}
      p="lg"
      pt="xl"
      style={
        isCurrentPlan
          ? { borderColor: `var(--mantine-color-${theme.primaryColor}-4)` }
          : undefined
      }
      className={utils["alt-background"]}
      {...cardProps}
    >
      <Stack h="100%">
        <Group justify="space-between">
          <Title order={4} ta="center">
            {priceKey === "lifetime" ? "Lifetime Pro License" : name}
          </Title>
          {isCurrentPlan && (
            <Badge variant="light" size="xs">
              Current plan
            </Badge>
          )}
        </Group>
        {description}
        <Divider />
        {price === 0 ? (
          <Group gap="xs" align="center">
            <Text fw={500} fz="xl" lh="2.25rem">
              Free forever
            </Text>
            <TbHeartFilled
              size="1.125rem"
              color={`var(--mantine-color-${theme.primaryColor}-4)`}
            />
          </Group>
        ) : (
          <Group gap={6}>
            <Text fw={500} fz="2rem" lh="1">
              <small>$</small>
              {price}
            </Text>
            {priceKey !== "lifetime" ? (
              <Text component="sup" size="sm" mb="md">
                /mo
              </Text>
            ) : (
              <Text component="sup" size="xs" mb="md" fw="bold">
                one time
              </Text>
            )}
          </Group>
        )}
        <Divider />
        {quotas}
        <Divider mt="auto" />
        <Group>
          {price === 0 ? (
            <>
              {user ? (
                <Text w="100%" size="sm" c="dimmed" ta="center" lh="2.25rem">
                  Please share your experience!{" "}
                  <TbHeartFilled
                    style={{ position: "relative", top: "0.125rem" }}
                    color="#ff0080"
                  />
                </Text>
              ) : (
                <Button
                  fullWidth
                  variant="light"
                  component={InternalLink}
                  href={`/auth/signup`}
                >
                  Get started
                </Button>
              )}
            </>
          ) : priceKey ? (
            <StripeButton planName={name} priceKey={priceKey} />
          ) : null}
        </Group>
      </Stack>
    </Card>
  );
};

const PricingTable: React.FC = () => {
  return (
    <SimpleGrid cols={{ xs: 1, md: 3 }} spacing="lg">
      <PricingCard
        name="Free account"
        price={0}
        description={
          <Text size="sm" c="dimmed">
            For smaller and hobby sites or for just trying out DecapBridge.
          </Text>
        }
        quotas={
          <List size="sm">
            <List.Item>{freeSitesLimit} sites</List.Item>
            <List.Item>
              {freeCollaboratorLimit} collaborators per site
            </List.Item>
          </List>
        }
      />
      <PricingCard
        name="Professional"
        price={9}
        priceKey="pro"
        description={
          <Text size="sm" c="dimmed">
            For professional developers with many sites and teams of
            collaborators.
          </Text>
        }
        quotas={
          <List size="sm">
            <List.Item>Unlimited sites</List.Item>
            <List.Item>Unlimited collaborators</List.Item>
            <List.Item>Branded login screens and invite emails</List.Item>
            <List.Item>DecapBridge & DecapCMS technical support</List.Item>
          </List>
        }
      />
      <PricingCard
        name="Lifetime license"
        price={199}
        priceKey="lifetime"
        description={
          <Text size="sm" c="dimmed">
            Lifetime pro license + commercial self-hosting license.
          </Text>
        }
        quotas={
          <List size="sm">
            <List.Item>Unlimited sites</List.Item>
            <List.Item>Unlimited collaborators</List.Item>
            <List.Item>Branded login screens and invite emails</List.Item>
            <List.Item>DecapBridge & DecapCMS technical support</List.Item>
            <List.Item>White-label Self-Hosting Commercial License</List.Item>
          </List>
        }
      />
    </SimpleGrid>
  );
};

export default PricingTable;
