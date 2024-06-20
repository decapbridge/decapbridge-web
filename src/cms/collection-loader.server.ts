import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import { ParsedCollectioneMeta } from "/src/utils/types";
import { collections } from "./schema.server";

export type CollectionsCmsSchema = Record<string, z.ZodObject<z.ZodRawShape>>;

type CollectionSchemas = typeof collections;
export type CollectionKeys = keyof CollectionSchemas;
export type Collections = {
  [K in CollectionKeys]: z.infer<CollectionSchemas[K]> & {
    meta: ParsedCollectioneMeta;
  };
};

const getCollectionPath = (collection: CollectionKeys) =>
  path.join(process.cwd(), "content/collections", collection);

export const getKeys = (collection: CollectionKeys): string[] => {
  const keys = fs
    .readdirSync(getCollectionPath(collection))
    .map((path) => path.replace(`.md`, ""));

  return keys;
};

export const readOne = <C extends CollectionKeys>(
  collection: C,
  key: string
) => {
  const root = getCollectionPath(collection);

  const filePath = `${root}/${key}.md`;

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `File ${filePath.replace(process.cwd(), "")} does not exist.`
    );
  }

  const {
    data: { meta, ...fields },
    content,
  } = matter(
    fs.readFileSync(filePath, {
      encoding: "utf-8",
    })
  );

  return {
    key,
    meta: {
      ...meta,
      urlPathname: `/${collection}/${key.replace("index", "")}`,
    },
    ...fields,
    body: content,
  } as Collections[C];
};

export const readAll = <C extends CollectionKeys>(
  collection: C
): Collections[C][] =>
  getKeys(collection).map((key) => readOne(collection, key));
