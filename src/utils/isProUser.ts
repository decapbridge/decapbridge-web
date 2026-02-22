import { CustomDirectusUser } from "./directus";

export default function isProUser(user: CustomDirectusUser) {
  return Boolean(
    import.meta.env.VITE_DECAPBRIDGE_IS_SELFHOSTED ||
    user.stripe_subscription_status === "active"
  )
}