// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/*"] },
  {
    rules: {
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
  }
);
