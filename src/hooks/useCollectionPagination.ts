import useDirectusRequest from "./useDirectusRequest";
import { AllCollections, aggregate } from "@directus/sdk";
import { usePagination } from "@mantine/hooks";
import { CustomSchema } from "/src/utils/directus";

const useCollectionPagination = (collection: AllCollections<CustomSchema>, limit = 10) => {
  const { data: counts } = useDirectusRequest(
    aggregate(collection, {
      aggregate: {
        count: "*",
      },
    })
  );
  const count = Number(counts?.[0]?.count ?? 0);
  const totalPages = Math.ceil(count / limit);
  const { active: page, setPage } = usePagination({ total: totalPages });
  return {
    page,
    setPage,
    limit,
    totalPages,
  };
};

export default useCollectionPagination;
