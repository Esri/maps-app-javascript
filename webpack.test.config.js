const webpack = require("webpack");
const path = require("path");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractStyles = new ExtractTextPlugin("src/app/styles/main.css");

module.exports = env => {
  return {
    entry: [
      "./tests/unit/all.ts",
    ],
    output: {
      filename: path.join("~tmp", "tests.js"),
      libraryTarget: "amd"
    },
    stats: {
      colors: true
    },
    devtool: "#inline-source-map",
    resolve: {
      modules: [path.resolve(__dirname, "/src"), path.resolve(__dirname, "/tests"), "node_modules/"],
      extensions: [".ts", ".tsx", ".js", ".css"]
    },

    module: {
      rules: [
        { test: /\/js\/.*\.js$/, use: "@theintern/istanbul-loader" },
        { test: /\.tsx?$/, use: [ "@theintern/istanbul-loader", "awesome-typescript-loader" ] }
      ]
    },

    plugins: [
      // nls files
      new CopyWebpackPlugin([
        {
          from: "src/app/widgets/Authenticate/nls",
          to: path.join(__dirname, "/~tmp") + "/widgets/Authenticate/nls"
        }
      ])
    ],

    externals: [
      (context, request, callback) => {
        if (
          /^dojo/.test(request) ||
          /^esri/.test(request)
        ) {
          if (request.includes("dojo/i18n!.")) {
            request = request.replace(/^dojo\/i18n!\./, "dojo/i18n!./widgets");
          }
          return callback(null, "amd " + request);
        }
        callback();
      }
    ]
  };
};
