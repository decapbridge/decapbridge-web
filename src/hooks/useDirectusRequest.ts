import {
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { RestCommand } from "@directus/sdk";
import directus, { CustomSchema } from "/src/utils/directus";

const useDirectusRequest = <Output>(
  request: RestCommand<Output, CustomSchema>,
  options?: Omit<Parameters<typeof useQuery>[0], "queryFn" | "queryKey">
) => {
  const key = request();
  const result = useQuery({
    ...options,
    queryKey: [key.path.split('/')[2], key.path, key.params],
    queryFn: () => directus.request(request),

    // keep "cache" across different queries in the same hook. Useful for pagination.
    placeholderData: keepPreviousData,
  });

  return result as UseQueryResult<Output, unknown>;
};

export default useDirectusRequest;
