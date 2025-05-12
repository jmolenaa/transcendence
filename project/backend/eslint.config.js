import js from "@eslint/js";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    // Specifies the files that this configuration will apply to, in this case all Javascript
    files: ["**/*.{js,mjs,cjs}"],

    // Configures language options, such as global variables for the environment [1]
    languageOptions: {
      globals: globals.node,
    },

    // Specifies plugins to enhance ESLint functionality, in this case, the JavaScript plugin and Prettier plugin
    plugins: {
      js,
      prettier: prettierPlugin,
    },

    // Extends the recommended ESLint rules for JavaScript
    extends: [
      "js/recommended"
    ],

    // Defines custom rules for the project, if this isn't here the prettier errors will not show up, nor will the code be formatted
    // TODO enforce it
    // not enforced for now, so not to many diffs when merging

    rules: {
      "prettier/prettier": "error", // Enforces Prettier formatting as an error
    },
  },
]);

/*
[1] This is important because Node.js has its own set of global variables and functions that are not available in the browser. By specifying the Node.js environment, ESLint will recognize these globals and avoid flagging them as undefined.
*/