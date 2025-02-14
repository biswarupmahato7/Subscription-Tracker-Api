import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended, // Apply recommended rules first
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-undef': 'off', // ✅ Custom rule applied AFTER recommended rules
    },
  },
];
