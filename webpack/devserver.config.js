/* eslint-env node */

module.exports = function (/*env*/) {
  return {
    port: 8080,
    host: "localhost",
    historyApiFallback: true,
    noInfo: true,
    compress: true,
    disableHostCheck: true,
    stats: {
      colors: true
    }
  };
}