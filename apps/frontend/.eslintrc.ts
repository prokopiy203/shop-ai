import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,

  // ✅ Node.js config files
  {
    files: ["next.config.*", "postcss.config.*", "tailwind.config.*"],
    env: {
      node: true,
    },
  },
];
