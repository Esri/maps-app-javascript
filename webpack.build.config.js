const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AppCachePlugin = require("appcache-webpack-plugin-plus").default;
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CompressionPlugin = require("compression-webpack-plugin");

const cleanPlugin = require("clean-webpack-plugin");
const workboxPlugin = require("workbox-webpack-plugin");

const dist = path.join(__dirname, "/dist");
const JSAPI_VERSION = "jsdev.arcgis.com/4.6";

module.exports = env => {
  return {
    entry: [
      "./src/app/main.ts",
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
            transpileOnly: true,
            configFileName: "tsconfig.build.json"
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
                  path: "../postcss.config.js"
                }
              }
            ]
          })
        }
      ]
    },

    plugins: [
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/
      }),
      new UglifyJSPlugin({
        sourceMap: false
      }),
      new webpack.NamedModulesPlugin(),
      new CopyWebpackPlugin([
        {
          from: "public",
          to: dist
        }
      ]),
      new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
      // nls files
      new CopyWebpackPlugin([
        {
          from: "src/app/widgets/Authenticate/nls",
          to: `${dist}/app/widgets/Authenticate/nls`
        }
      ]),
      new ExtractTextPlugin("app/styles/main.css"),
      new AppCachePlugin({
        network: ["*"],
        settings: ["prefer-online"],
        output: "manifest.appcache"
      }),
      new HtmlWebpackPlugin({
        title: "ArcGIS Maps App JavaScript",
        template: "src/index.ejs",
        filename: "index.html",
        inject: false,
        MODE: "prod",
        JSAPI: JSAPI_VERSION
      }),
      new HtmlWebpackPlugin({
        template: "src/iframe-inject-appcache-manifest.ejs",
        filename: "iframe-inject-appcache-manifest.html"
      }),
      new workboxPlugin({
        globDirectory: "./dist",
        globPatterns: ["**/*.{html,js,css,png}"],
        swDest: path.join("./dist", "sw.js"),
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: new RegExp("https://jsdev.arcgis.com"),
            handler: "staleWhileRevalidate"
          },
          {
            urlPattern: new RegExp("https://basemaps.arcgis.com"),
            handler: "staleWhileRevalidate"
          }
        ]
      })
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
