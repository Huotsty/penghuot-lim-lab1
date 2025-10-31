// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      semi: "error",
      "prefer-const": "error"
    }
  }
]);
