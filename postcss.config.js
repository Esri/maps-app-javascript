"use strict";

module.exports = ({ file, options, env }) => {
  const config = {
    plugins: []
  };
  config.plugins = [].concat(
    require("postcss-import"),
    require("postcss-cssnext")({
      features: {
        customProperties: {
          warnings: false
        }
      }
    })
  );
  if (process.platform !== "win32") {
    config.plugins.push(
      require("webpcss").default({ replace_to: ".$1.webp", noWebpClass: ".no-webp" })
    );
  }
  config.plugins = config.plugins.concat(
    require("postcss-assets"),
    require("css-mqpacker"),
    require("cssnano")({
      preset: "default"
    })
  );
  return config;
};
