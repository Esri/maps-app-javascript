const webpack = require("webpack");
const path = require("path");

const moduleConfig = require("./webpack/module.config");
const plugins = require("./webpack/plugins.config");
const devServer = require("./webpack/devserver.config");
const externals = require("./webpack/externals.config");

module.exports = function(env, options) {
  const config = {
    entry: [
      "./src/app/main.ts",
      "./src/app/styles/main.scss"
    ],
    stats: {
      colors: true
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      filename: "app/main.js",
      chunkFilename: '[id].main.js',
      library: "app/main",
      libraryTarget: "amd"
    },

    resolve: {
      modules: [path.resolve(__dirname, "/src"), "node_modules/"],
      extensions: [".ts", ".tsx", ".js", ".css"]
    },

    module: moduleConfig(...arguments),

    plugins: plugins(...arguments),

    externals: externals
  };

  if (env.dev) {
    config.devtool = "cheap-module-source-map";
    config.devServer = devServer(...arguments);
  }

  return config;
};
