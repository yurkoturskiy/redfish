// Add linaria support with craco.
// Source example: https://github.com/drownbes/linaria-cra

const {
  loaderByName,
  getLoader
} = require("@craco/craco");
const transformBabelLoader = require('./transformBabelLoader');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const lm = getLoader(webpackConfig, loaderByName('babel-loader'));
      const loader = lm.match.loader;
      webpackConfig.module.rules[2].oneOf[1] = transformBabelLoader(loader);
      return webpackConfig;
    }
  }
}
