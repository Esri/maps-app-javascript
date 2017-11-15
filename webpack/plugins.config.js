/* eslint-env node */
const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const AppCachePlugin = require("appcache-webpack-plugin-plus").default;
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const workboxPlugin = require("workbox-webpack-plugin");

const html = require("./html.config");
const sw = require("./sw.config");
const dist = path.resolve(__dirname, "../dist");

module.exports = function(env, options) {
  let htmls = html(env, options).map(x => new HtmlWebpackPlugin(x));
  let plugins = [
    ...htmls,
    new CopyWebpackPlugin([
      {
        from: "src/assets",
        to: `${dist}/assets`,
        ignore: [
          "*.ico"
        ]
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: "src/app-manifest.json",
        to: `${dist}/app-manifest.json`
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: "src/app/widgets/Authenticate/nls",
        to: `${dist}/app/widgets/Authenticate/nls`
      }
    ]),
    new ExtractTextPlugin("app/styles/main.css"),
    new ManifestPlugin({
      fileName: "asset-manifest.json",
    })
  ];

  if (process.env.ANALYZE) {
    plugins.push(new BundleAnalyzerPlugin())
  }
  if (env.production) {
    plugins.push(
      new UglifyJSPlugin({
        sourceMap: false,
        uglifyOptions: {
          ie8: false,
          ecma: 8,
          output: {
            comments: false,
            beautify: false
          },
          warnings: false
        }
      })
    );
    plugins.push(
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/
      })
    );
    plugins.push(new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }));
    plugins.push(
      new AppCachePlugin({
        network: ["*"],
        settings: ["prefer-online"],
        output: "manifest.appcache"
      })
    );
    plugins.push(
      new workboxPlugin(sw)
    );
  }
  else {
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  plugins.push(new StyleExtHtmlWebpackPlugin());
  return plugins;
};
