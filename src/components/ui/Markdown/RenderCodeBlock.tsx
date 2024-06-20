import { Code } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import { Components } from "react-markdown";

const RenderCodeBlock: Components["pre"] = ({ node, children }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const maybeChild = node?.children[0] as any;
  if (maybeChild?.tagName === "code") {
    const text = maybeChild?.children[0]?.value;

    let lang: string | undefined = undefined;
    const maybeClass = maybeChild?.properties?.className?.[0];
    if (maybeClass?.startsWith("language-")) {
      lang = maybeClass.replace("language-", "");
    }

    return <CodeHighlight language={lang} code={text} />;
  }
  return <Code block>{children}</Code>;
};

export default RenderCodeBlock;
