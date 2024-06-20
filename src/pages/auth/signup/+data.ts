import type { DataSync } from "vike/types";
import type { PageData } from "/src/utils/types";
import { readPage } from "/src/cms/page-loader.server";

export const data = (() => {
  return readPage("auth/signup");
}) satisfies DataSync<PageData>;

export type Data = ReturnType<typeof data>;
