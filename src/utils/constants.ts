import type { MantineColorScheme } from "@mantine/core";

export const defaultColorScheme: Exclude<MantineColorScheme, "auto"> = "light";

export const mainContentId = "main";

export const passwordResetUrl = "/auth/password/reset";

export const getPasswordResetUrl = () => `${window.location.origin}${passwordResetUrl}`

export const getDirectusUrl = () => {
  return import.meta.env.VITE_DECAPBRIDGE_API_URL || "http://localhost:8055"
}

export const getGitGatewayUrl = () => {
  return import.meta.env.VITE_DECAPBRIDGE_GATEWAY_URL || "http://localhost:8081"
}