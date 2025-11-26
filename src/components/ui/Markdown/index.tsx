import { Stack } from "@mantine/core";
import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";

import components from "./components";

import styles from "./markdown-overrides.module.css";

interface MarkdownProps extends Options {
  markdown: string;
  className?: string;
}

const Markdown: React.FC<MarkdownProps> = ({
  markdown,
  className,
  ...options
}) => (
  <Stack
    id="markdown-content"
    className={`${styles["markdown-container"]} ${className}`}
  >
    <ReactMarkdown
      {...options}
      components={{ ...components, ...options.components }}
      remarkPlugins={[remarkGfm]}
    >
      {markdown}
    </ReactMarkdown>
  </Stack>
);

export default Markdown;
