/* eslint-disable react-refresh/only-export-components */
import { useMemo } from "react";
import {
  Title,
  Text,
  Anchor,
  Blockquote,
  List,
  Code,
  Image,
  Divider,
  TitleProps,
} from "@mantine/core";
import { Components } from "react-markdown";
import RenderCodeBlock from "./RenderCodeBlock";
import InternalLink from "/src/components/core/InternalLink";
import slugify from "/src/utils/slugify";

const withDefaultProps =
  <C extends React.FC, P extends Omit<Parameters<C>[0], "ref">>(
    Component: C,
    defaultProps: P
  ) =>
    // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    ({ node, ...mdProps }: any) => {
      if (mdProps?.href && mdProps.href.startsWith('http')) {
        mdProps.target = '_blank'
      }
      return <Component {...defaultProps} {...mdProps} />;
    };

const TitleWithId: React.FC = (props: TitleProps) => {
  const slug = useMemo(() => {
    return slugify(props.children?.toString() ?? "");
  }, [props.children]);
  return <Title id={slug} {...props} />;
};

const components: Components = {
  h1: withDefaultProps(TitleWithId, { order: 1 }),
  h2: withDefaultProps(TitleWithId, { order: 2 }),
  h3: withDefaultProps(TitleWithId, { order: 3 }),
  h4: withDefaultProps(TitleWithId, { order: 4 }),
  h5: withDefaultProps(TitleWithId, { order: 5 }),
  h6: withDefaultProps(TitleWithId, { order: 6 }),
  p: withDefaultProps(Text, {}),
  // @ts-expect-error weird types
  a: withDefaultProps(Anchor, { component: InternalLink }),
  blockquote: withDefaultProps(Blockquote, {}),
  img: withDefaultProps(Image, {}),
  hr: withDefaultProps(Divider, {}),
  ul: withDefaultProps(List, {}),
  ol: withDefaultProps(List, { type: "ordered" }),
  li: withDefaultProps(List.Item, {}),
  code: withDefaultProps(Code, {}),
  pre: RenderCodeBlock,
};

export default components;
