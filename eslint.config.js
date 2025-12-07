const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const i18nextPlugin = require('eslint-plugin-i18next');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
  },
  // i18next recommended flat config
  i18nextPlugin.configs['flat/recommended'],
  {
    files: ['src/i18n/**'],
    rules: {
      'import/no-named-as-default-member': 'off',
    },
  },
]);
