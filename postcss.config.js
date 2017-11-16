"use strict";

module.exports = ({ file, options, env }) => ({
  plugins: [
    require("postcss-import"),
    require("postcss-cssnext")({
      features: {
        customProperties: {
          warnings: false
        }
      }
    }),
    require("webpcss").default({ replace_to: ".$1.webp",  noWebpClass: ".no-webp" }),
    require("postcss-assets"),
    require("css-mqpacker"),
    require("cssnano")({
      preset: "default"
    })
  ]
})
