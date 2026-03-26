import React, { useMemo } from "react";
import { TbSearch } from "react-icons/tb";
import {
  Spotlight,
  SpotlightProps,
  SpotlightActionData,
} from "@mantine/spotlight";

import navigate from "/src/utils/navigate";
import useGlobalData from "/src/hooks/useGlobalData";
import { env } from "/src/utils/env";

import styles from "./spotlight.module.css";
import useAuthActions from "/src/hooks/useAuthActions";

const cloudOnlyPages = ["/contact", "/dashboard/billing"];
const cloudOnlyCollections = ["docs", "legal"];

const SpotlightSearch: React.FC<Omit<SpotlightProps, "actions">> = (props) => {
  const {
    misc: { search_label, empty_label },
    pagesMeta,
  } = useGlobalData();
  const { logout } = useAuthActions();
  const isCloud = env('VITE_DECAPBRIDGE_IS_CLOUD');

  const actions: SpotlightActionData[] = useMemo(() => {
    return Object.entries(pagesMeta)
      .filter(([key]) => isCloud || !cloudOnlyCollections.includes(key))
      .flatMap(([, metas]) => metas)
      .filter((meta) => isCloud || !cloudOnlyPages.includes(meta.urlPathname))
      .map((meta) => ({
        id: meta.urlPathname,
        label: meta.title,
        description: meta.description,
        onClick: () => navigate(meta.urlPathname),
      }))
      .concat({ id: "logout", label: "Logout", onClick: logout } as any);
  }, []);

  return (
    <Spotlight
      classNames={styles}
      actions={actions}
      searchProps={{
        leftSection: <TbSearch size={18} />,
        placeholder: search_label,
      }}
      nothingFound={empty_label}
      highlightQuery
      limit={9}
      {...props}
    />
  );
};

export default SpotlightSearch;
