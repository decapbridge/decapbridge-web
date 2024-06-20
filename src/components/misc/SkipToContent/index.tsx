import { Button } from "@mantine/core";
import styles from "./skip-to-content.module.css";

/**
 * Skip to the page's main content
 * https://a11yproject.com/posts/skip-nav-links/
 */

interface Props {
  id: string;
}

const SkipToContent: React.FC<Props> = ({ id }) => (
  <Button component="a" className={styles.link} href={`#${id}`}>
    Skip to content
  </Button>
);

export default SkipToContent;
