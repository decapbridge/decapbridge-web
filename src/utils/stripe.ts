import { customEndpoint } from "@directus/sdk";
import directus from "./directus";

export const stripePriceKeys = ['pro', 'lifetime'] as const;

export type StripePriceKey = (typeof stripePriceKeys)[number]

export const goToCheckout = async (price_key: StripePriceKey) => {
  const { redirect_url } = await directus.request(customEndpoint<{ redirect_url: string }>({
    path: "/stripe/create-checkout-session",
    method: "POST",
    body: JSON.stringify({ price_key }, null, 2),
  }));
  window.location.href = redirect_url;
}

export const goToPortal = async () => {
  const { redirect_url } = await directus.request(customEndpoint<{ redirect_url: string }>({
    path: "/stripe/create-portal-session",
    method: "POST",
  }));
  window.location.href = redirect_url;
}
