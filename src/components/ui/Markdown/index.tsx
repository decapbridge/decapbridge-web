import { Stack } from "@mantine/core";
import ReactMarkdown, { Options } from "react-markdown";

import components from "./components";

import styles from "./markdown-overrides.module.css";

interface MarkdownProps extends Options {
  markdown: string;
}

const Markdown: React.FC<MarkdownProps> = ({ markdown, ...options }) => (
  <Stack className={styles["markdown-container"]} id="markdown-content">
    <ReactMarkdown
      {...options}
      components={{ ...components, ...options.components }}
    >
      {markdown}
    </ReactMarkdown>
  </Stack>
);

export default Markdown;
