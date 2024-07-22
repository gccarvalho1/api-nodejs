import globals from "globals";
import pluginJs from "@eslint/js";

const config = {
  languageOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node,
      es2021: true,
    },
  },
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": "off",
  },
};

export default [
  pluginJs.configs.recommended,
  config,
];
