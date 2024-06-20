import type { PossibleLinks, ParsedPageMeta } from "/src/utils/types";
import useGlobalData from "/src/hooks/useGlobalData";

const usePageMeta = (...paths: PossibleLinks[]) => {
  const { pagesMeta } = useGlobalData();
  const allMeta = Object.values(pagesMeta).flat();
  return paths.length > 0
    ? (paths
        .map((path) => allMeta.find((m) => m.urlPathname === path))
        .filter(Boolean) as ParsedPageMeta[])
    : allMeta;
};

export default usePageMeta;
