import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'

export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: pluginPrettier,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Add your custom rules here
      'prettier/prettier': 'warn',
      'react/react-in-jsx-scope': 'off', // React 17+ doesn't require React to be in scope
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['frontend/**/*.ts', 'frontend/**/*.tsx'],
    ...pluginReactConfig,
    rules: {
      // Add frontend-specific rules here
    },
  },
  configPrettier,
  {
    ignores: ['node_modules', 'dist', '*.js'],
  }
)
