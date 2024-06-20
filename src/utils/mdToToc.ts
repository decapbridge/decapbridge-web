import slugify from "./slugify";

export interface TocItem {
  level: number;
  content: string;
  id: string;
}

const headerRegex = /(?<flag>#{1,6})\s+(?<content>.+)/g;

const mdToToc = (markdown: string): TocItem[] => {
  return Array.from(markdown.matchAll(headerRegex)).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ groups: { flag, content } }: any) => ({
      level: flag.length + 1,
      content: content,
      id: slugify(content),
    })
  );
};

export default mdToToc;
