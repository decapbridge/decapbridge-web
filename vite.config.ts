import { UserConfig } from "vite";
import vike from "vike/plugin";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

const config: UserConfig = {
  plugins: [
    vike({ prerender: { noExtraDir: true } }),
    react(),
    ViteImageOptimizer({ logStats: true }),
  ],
};

export default config;
