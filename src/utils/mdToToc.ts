import slugify from "./slugify";

export interface TocItem {
  level: number;
  content: string;
  id: string;
}

const headerRegex = /(?<flag>#{1,6})\s+(?<content>.+)/g;

const mdToToc = (markdown: string): TocItem[] => {
  return Array.from(markdown.matchAll(headerRegex))
    .map(m => m.groups)
    .filter((g): g is NonNullable<typeof g> => g !== undefined)
    .map(
      (groups) => {
        const { flag, content } = groups
        return {
          level: flag.length + 1,
          content: content,
          id: slugify(content),
        }
      }
    );
};

export default mdToToc;
