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
    "css-mqpacker": {},
    "cssnano": {
      preset: "default"
    }
  }
};
