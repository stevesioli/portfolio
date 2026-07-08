// @ts-check
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Shared ESLint flat config for all apps/packages in the resume monorepo.
 * Each app extends this and layers on project-specific overrides.
 */
export const baseConfig = tseslint.config(
  { ignores: ['dist', 'build', '.turbo', 'node_modules', 'public/remotes'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          // shadcn/ui-style component files pair a component with a
          // `cva(...)`-based variants export (e.g. buttonVariants,
          // badgeVariants), and context provider files pair a component
          // with its companion hook (e.g. useTheme). Neither breaks Fast
          // Refresh in practice — allowlist the known names by pattern
          // instead of scattering eslint-disable comments through
          // @resume/ui's component files.
          allowExportNames: ['buttonVariants', 'badgeVariants', 'useTheme'],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'warn',
    },
  },
);

export default baseConfig;
