import { render } from "vike/abort";
import type { DataSync } from "vike/types";
import type { PageData } from "/src/utils/types";
import { readOne } from "/src/cms/collection-loader.server";

export const data = (({ routeParams: { pageKey } }) => {
  try {
    return readOne("legal", pageKey);
  } catch (error: unknown) {
    throw render(404, (error as Error).message);
  }
}) satisfies DataSync<PageData>;

export type Data = ReturnType<typeof data>;
