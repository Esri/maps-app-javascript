"use strict";

module.exports = ({ file, options, env }) => ({
  plugins: {
    "postcss-import": {},
    "postcss-cssnext": {},
    "css-mqpacker": {},
    "cssnano": "production"
  }
});