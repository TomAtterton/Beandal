const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const i18nextPlugin = require('eslint-plugin-i18next');

module.exports = defineConfig([
  // Base Expo config
  expoConfig,

  // Ignore build output
  globalIgnores(['dist/*']),

  // i18next flat config
  i18nextPlugin.configs['flat/recommended'],

  // i18n files overrides
  {
    files: ['src/i18n/**'],
    rules: {
      'import/no-named-as-default-member': 'off',
    },
  },

  // Prevent inline hex colors outside theme files
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    ignores: ['src/theme/**'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/^#(?:[0-9a-fA-F]{3}){1,2}$/]',
          message: 'Use theme color tokens instead of raw hex colors.',
        },
      ],
    },
  },

  // Prettier MUST be last so it can override conflicting rules
  eslintPluginPrettierRecommended,
]);
