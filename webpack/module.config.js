/* eslint-env node */

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function() {
  return {
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
              loader: "postcss-loader"
            }
          ]
        })
      }
    ]
  };
};
