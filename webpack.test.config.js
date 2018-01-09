const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = env => {
  return {
    entry: {
      init: "./src/app/main.ts",
      tests: "./tests/unit/all.ts"
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "~tmp"),
      libraryTarget: "amd"
    },
    stats: {
      colors: true
    },
    devtool: "#inline-source-map",
    resolve: {
      modules: [
        path.resolve(__dirname, "/src"),
        path.resolve(__dirname, "/tests"),
        "node_modules/"
      ],
      extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
    },

    module: {
      rules: [{ test: /\.tsx?$/, use: ["@theintern/istanbul-loader", "awesome-typescript-loader"] }]
    },

    plugins: [
      // nls files
      new CopyWebpackPlugin([
        {
          from: "src/app/widgets/Authenticate/nls",
          to: path.join(__dirname, "/~tmp") + "/widgets/Authenticate/nls"
        },
        {
          from: "src/app/widgets/UserNav/nls",
          to: path.join(__dirname, "/~tmp") + "/widgets/UserNav/nls",
          ignore: [".gitkeep", ".DS_Store"]
        }
      ])
    ],

    externals: [
      (context, request, callback) => {
        if (/^dojo/.test(request) || /^esri/.test(request)) {
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
