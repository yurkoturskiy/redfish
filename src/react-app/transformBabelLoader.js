// Add linaria support with craco.
// Source example: https://github.com/drownbes/linaria-cra

module.exports = loader => ({
  test: loader.test,
  include: loader.include,
  rules: [
    {
      loader: loader.loader,
      options: {
        presets: [loader.options.presets[0], 'linaria/babel']
      }
    },
    {
      loader: 'linaria/loader',
      options: {
        cacheDirectory: 'src/.linaria_cache',
        sourceMap: process.env.NODE_ENV !== 'production',
        babelOptions: {
          presets: loader.options.presets
        }
      }
    }
  ]
})
