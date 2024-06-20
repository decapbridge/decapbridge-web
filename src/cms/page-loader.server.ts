import { pages } from "./schema.server";
import type { PageLinks, RawPageMeta, ParsedPageMeta } from "/src/utils/types";

export type PagesCmsSchema = Record<string, { meta: RawPageMeta }>;

export type Pages = typeof pages;
export type PageKeys = keyof Pages;

export const readPage = <K extends PageKeys>(key: K) => {
  const { meta, ...fields } = pages[key];

  return {
    ...fields,
    meta: {
      ...meta,
      urlPathname: `/${key.replace("index", "")}` as PageLinks,
    },
  } as Pages[K] & { meta: ParsedPageMeta };
};

export const readAllPages = () =>
  (Object.keys(pages) as PageKeys[]).map((key) => readPage(key));
