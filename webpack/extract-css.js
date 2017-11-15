/* eslint-env node */
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = ExtractTextPlugin.extract({
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
});