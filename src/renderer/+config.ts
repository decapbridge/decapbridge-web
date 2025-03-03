import type { Config } from "vike/types";
import vikeReact from "vike-react/config";

import App from "/src/components/core/App";
import Head from "/src/components/core/Head";

// https://vike.dev/config
export default {
  extends: vikeReact,
  prerender: true,
  prefetchStaticAssets: "viewport",
  passToClient: ["routeParams", "is404", "global"],
  Wrapper: App,
  Head,
} satisfies Config;
