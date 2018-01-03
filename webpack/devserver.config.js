/* eslint-env node */
const path = require("path");

module.exports = function (/*env*/) {
  return {
    port: 8080,
    host: "localhost",
    historyApiFallback: true,
    noInfo: true,
    compress: true,
    disableHostCheck: true,
    open: true,
    stats: {
      colors: true
    }
  };
}