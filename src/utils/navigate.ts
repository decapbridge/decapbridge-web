import { navigate as _navigate } from "vike/client/router";
import type { PossibleLinks } from "/src/utils/types";

type NavigateArgs = Parameters<typeof _navigate>[1] & {
  queryParams: Record<string, string>;
};

const navigate = async (url: PossibleLinks, args?: NavigateArgs) => {
  const maybeQueryParams = args?.queryParams
    ? `?${new URLSearchParams(args.queryParams).toString()}`
    : "";

  await _navigate(`${url}${maybeQueryParams}`, args);
};

export default navigate;
