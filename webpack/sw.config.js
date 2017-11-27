const path = require("path");

module.exports = {
  globDirectory: "./dist",
  globPatterns: ["**/*.{html,js,css,png,webp}"],
  swDest: path.join("./dist", "sw.js"),
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: new RegExp("https://js.arcgis.com"),
      handler: "staleWhileRevalidate"
    },
    {
      urlPattern: new RegExp("https://basemaps.arcgis.com"),
      handler: "staleWhileRevalidate"
    },
    {
      urlPattern: new RegExp("https://arcgis.com/sharing"),
      handler: "staleWhileRevalidate"
    }
  ]
};