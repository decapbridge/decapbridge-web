import type { MantineColorScheme } from "@mantine/core";

export const defaultColorScheme: Exclude<MantineColorScheme, "auto"> = "light";

export const mainContentId = "main";

export const passwordResetUrl = "/auth/password/reset";

export const getPasswordResetUrl = () => `${window.location.origin}${passwordResetUrl}`

export const getDirectusUrl = () => {
  if (typeof window !== 'undefined' && window.location.origin.includes('localhost')) {
    return "http://localhost:8055"
  }
  return "https://auth.decapbridge.com"
}

export const getGitGatewayUrl = () => {
  if (typeof window !== 'undefined' && window.location.origin.includes('localhost')) {
    return "http://localhost:8081"
  }
  return "https://gateway.decapbridge.com"
}