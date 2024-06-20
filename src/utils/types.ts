import { z } from "zod";
import type { PageKeys } from "/src/cms/page-loader.server";
import type { CollectionKeys } from "/src/cms/collection-loader.server";

export const rawPageMetaSchema = z.object({
  title: z.string(),
  description: z.string(),
});
export type RawPageMeta = z.infer<typeof rawPageMetaSchema>;

export const baseCollectionSchema = z.object({
  key: z.string(),
  meta: rawPageMetaSchema,
  body: z.string(),
});
export type BaseCollection = z.infer<typeof baseCollectionSchema>;

export type ParsedPageMeta = RawPageMeta & {
  urlPathname: PageLinks;
};
export type PageData = Record<string, unknown> & {
  meta?: Partial<RawPageMeta>;
};

export type ParsedCollectioneMeta = RawPageMeta & {
  urlPathname: CollectionLinks;
};

export type PageLinks = `/${"" | Exclude<PageKeys, "index">}`;
export type CollectionLinks = `/${CollectionKeys}/${string}`;
export type PossiblePaths = PageLinks | CollectionLinks;
export type MaybeQueryParam = "" | `?${string}`;
export type PossibleLinks = `${PossiblePaths}${MaybeQueryParam}`;

