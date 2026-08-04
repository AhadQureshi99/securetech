import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

/**
 * eslint-config-next 15.5 still ships eslintrc-style configs (`{ extends: [] }`)
 * rather than flat-config arrays, so ESLint 9 cannot spread them directly —
 * importing them as flat config is what broke `next build`'s lint step with
 * "nextVitals is not iterable". FlatCompat translates them.
 */
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
