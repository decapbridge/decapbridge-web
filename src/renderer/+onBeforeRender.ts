import type { OnBeforeRenderSync } from "vike/types";
import { readAllSettings } from "/src/cms/settings-loader.server";
import { CollectionKeys, readAll } from "/src/cms/collection-loader.server";
import { readAllPages } from "/src/cms/page-loader.server";
import { collections } from "/src/cms/schema.server";
import { ParsedCollectioneMeta } from "/src/utils/types";

const getGlobalData = () => {
  const settings = readAllSettings();
  return {
    // Settings
    ...settings,

    pagesMeta: {
      mainPages: readAllPages().map((p) => p.meta),
      ...(Object.keys(collections) as CollectionKeys[]).reduce(
        (acc, collection) => ({
          ...acc,
          [collection]: readAll(collection).map((i) => i.meta),
        }),
        {} as Record<CollectionKeys, ParsedCollectioneMeta[]>
      ),
    },
  };
};

export type GlobalData = ReturnType<typeof getGlobalData>;

// Load global data
const onBeforeRender: OnBeforeRenderSync =
  (): ReturnType<OnBeforeRenderSync> => {
    return {
      pageContext: {
        global: getGlobalData(),
      },
    };
  };

export default onBeforeRender;
