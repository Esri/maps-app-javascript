/* eslint-env node */

const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function() {
  return {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, "../node_modules"),
          path.resolve(__dirname, "../src/app/styles")
        ],
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                url: false
              }
            },
            {
              loader: "postcss-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      }
    ]
  };
};
