"use strict";

module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-cssnext": {
      features: {
        customProperties: {
          warnings: false
        }
      }
    },
    "postcss-assets": {},
    "css-mqpacker": {},
    "cssnano": {
      preset: "default"
    }
  }
};
