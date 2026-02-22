import { createTheme, Image, Button, ActionIcon, Modal, Container, Notification } from "@mantine/core";
import styles from "./utils.module.css";
import siteSettings from '/content/settings/site.json'
import { generateColors } from "@mantine/colors-generator";

export const theme = createTheme({
  primaryColor: 'custom',
  fontFamily: '"IBM Plex Sans", sans-serif',
  headings: { fontFamily: '"Montserrat", sans-serif' },
  defaultRadius: import.meta.env.VITE_DECAPBRIDGE_THEME_RADIUS ?? 'xl',
  colors: {
    custom: generateColors(import.meta.env.VITE_DECAPBRIDGE_THEME_COLOR ?? '#e64980')
  },
  components: {
    Image: Image.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    Button: Button.extend({
      classNames: {
        root: styles["button-root"],
      },
    }),
    ActionIcon: ActionIcon.extend({
      classNames: {
        root: styles["button-root"],
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        centered: true,
      },
    }),
    Container: Container.extend({
      defaultProps: {
        w: "100%",
      },
    }),
    Notification: Notification.extend({
      defaultProps: {
        radius: "sm",
      },
    }),
  },
  other: {
    site_name: import.meta.env.VITE_DECAPBRIDGE_SITE_NAME ?? siteSettings.site_name,
    site_url: import.meta.env.VITE_DECAPBRIDGE_SITE_URL ?? siteSettings.site_url,
    site_logo: import.meta.env.VITE_DECAPBRIDGE_SITE_LOGO ?? '/favicon.svg',
  }
});
