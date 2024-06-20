import { OnBeforePrerenderStartSync } from "vike/types";
import { collections } from "/src/cms/schema.server";
import { CollectionKeys, readAll } from "/src/cms/collection-loader.server";

let ran = false;

// Register all URLs
const onBeforePrerenderStart: OnBeforePrerenderStartSync =
  (): ReturnType<OnBeforePrerenderStartSync> => {
    if (!ran) {
      ran = true;

      return (Object.keys(collections) as CollectionKeys[])
        .flatMap(readAll)
        .map((item) => item.meta.urlPathname);
    }
    return [];
  };

export default onBeforePrerenderStart;
