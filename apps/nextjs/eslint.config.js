import baseConfig, { restrictEnvAccess } from "@linked-out/eslint-config/base";
import nextjsConfig from "@linked-out/eslint-config/nextjs";
import reactConfig from "@linked-out/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
