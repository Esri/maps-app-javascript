const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const dist = path.join(__dirname, "/dist");
const JSAPI_VERSION = "jsdev.arcgis.com/4.6";

module.exports = env => {
  return {
    entry: [
      "webpack-dev-server/client?http://localhost:8080/", // WebpackDevServer host and port
      "webpack/hot/only-dev-server", // "only" prevents reload on syntax errors
      "./src/app/main.ts",
      //"./src/tests/unit/all.ts",
      "./src/app/styles/main.css"
    ],
    output: {
      path: dist,
      publicPath: "/dist/",
      filename: "app/main.js",
      chunkFilename: '[id].main.js',
      library: "app/main",
      libraryTarget: "amd"
    },
    devtool: "#inline-source-map",
    devServer: {
      inline: true,
      open: true
    },

    resolve: {
      modules: [path.resolve(__dirname, "/src"), "node_modules/"],
      extensions: [".ts", ".tsx", ".js", ".css"]
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader",
          options: {
            transpileOnly: true
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  url: false
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  warnings: false,
                  config: {
                    path: "postcss.config.js"
                  }
                }
              }
            ]
          })
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new CopyWebpackPlugin([
        {
          from: "public",
          to: dist
        }
      ]),
      // nls files
      new CopyWebpackPlugin([
        {
          from: "src/app/widgets/Authenticate/nls",
          to: `${dist}/app/widgets/Authenticate/nls`
        }
      ]),
      new HtmlWebpackPlugin({
        title: "ArcGIS Maps App JavaScript",
        template: "src/index.ejs",
        filename: "index.html",
        inject: false,
        MODE: "dev",
        JSAPI: JSAPI_VERSION
      }),
      new ExtractTextPlugin("app/styles/main.css")
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
