import { CustomDirectusUser } from "./directus";
import { env } from "./env";

export default function isProUser(user: CustomDirectusUser) {
  return Boolean(
    env('VITE_DECAPBRIDGE_IS_SELFHOSTED') ||
    user.stripe_subscription_status === "active"
  )
}