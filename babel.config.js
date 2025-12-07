module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            '@screens': './src/screens',
            '@theme': './src/theme',
            '@': './src',
          },
        },
      ],
    ],
  };
};
