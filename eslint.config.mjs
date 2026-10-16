import { defineConfig, globalIgnores } from 'eslint/config';
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = defineConfig([
  ...coreWebVitals,
  ...nextTypescript,
  // Turn off stylistic rules that conflict with Prettier (formatting is handled by `npm run format`).
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  // eslint-plugin-react@7.x is incompatible with ESLint 10 (removed context.getFilename API).
  // Disable the react/* rules that trigger this until eslint-plugin-react adds ESLint 10 support.
  // The @next/next, react-hooks/rules-of-hooks, react-hooks/exhaustive-deps, import, and jsx-a11y rules remain active.
  {
    rules: {
      'react/display-name': 'off',
      'react/jsx-key': 'off',
      'react/jsx-no-comment-textnodes': 'off',
      'react/jsx-no-duplicate-props': 'off',
      'react/jsx-no-target-blank': 'off',
      'react/jsx-no-undef': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'off',
      'react/no-children-prop': 'off',
      'react/no-danger-with-children': 'off',
      'react/no-deprecated': 'off',
      'react/no-direct-mutation-state': 'off',
      'react/no-find-dom-node': 'off',
      'react/no-is-mounted': 'off',
      'react/no-render-return-value': 'off',
      'react/no-string-refs': 'off',
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': 'off',
      'react/no-unsafe': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-render-return': 'off',
      // react-hooks/immutability is an experimental rule in react-hooks@7 that
      // produces false positives for browser API assignments (e.g. window.location.href).
      'react-hooks/immutability': 'off',
    },
  },
]);

export default eslintConfig;
