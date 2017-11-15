/* eslint-env node */

const extractCss = require("./extract-css");

module.exports = function () {
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
        use: extractCss
      }
    ]
  };
}