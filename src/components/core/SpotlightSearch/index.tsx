import React, { useMemo } from "react";
import { IconSearch } from "@tabler/icons-react";
import {
  Spotlight,
  SpotlightProps,
  SpotlightActionData,
} from "@mantine/spotlight";

import navigate from "/src/utils/navigate";
import useGlobalData from "/src/hooks/useGlobalData";

import styles from "./spotlight.module.css";

const SpotlightSearch: React.FC<Omit<SpotlightProps, "actions">> = (props) => {
  const {
    misc: { search_label, empty_label },
    pagesMeta,
  } = useGlobalData();

  const actions: SpotlightActionData[] = useMemo(() => {
    return Object.values(pagesMeta)
      .flat()
      .map((meta) => ({
        id: meta.urlPathname,
        label: meta.title,
        description: meta.description,
        onClick: () => navigate(meta.urlPathname),
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spotlight
      classNames={styles}
      actions={actions}
      searchProps={{
        leftSection: <IconSearch size={18} />,
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
