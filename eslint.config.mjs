import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettierConfig from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  {
    files: ['**/*.{js,ts,jsx,tsx}'],

    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort,
    },

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      // Prettier
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      ...prettierConfig.rules,

      // TypeScript
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // Imports
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^react', '^next'],
            ['^@?\\w'],
            ['^@/'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=[^/]*/*$)', '^\\./?$'],
            ['^.+\\.?(css|scss|sass|less)$'],
            ['^.+\\.svg(\\?.*)?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      'import/no-unresolved': 'error',
      'import/no-cycle': 'warn',

      // Safety
      'no-unsafe-optional-chaining': 'warn',
    },
  },
]);

export default eslintConfig;
