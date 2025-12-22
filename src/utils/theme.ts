import { createTheme, Image, Button, ActionIcon, Modal, Container, Notification } from "@mantine/core";
import styles from "./utils.module.css";

export const theme = createTheme({
  primaryColor: 'pink',
  fontFamily: '"IBM Plex Sans", sans-serif',
  headings: { fontFamily: '"Montserrat", sans-serif' },
  defaultRadius: 'xl',
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
});
