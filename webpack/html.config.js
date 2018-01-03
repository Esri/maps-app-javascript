/* eslint-env node */
const JSAPI_VERSION = "js.arcgis.com/4.6";

module.exports = function (env, options) {
  return [
    {
      title: "Maps App JavaScript",
      template: "src/index.ejs",
      filename: "index.html",
      favicon: "src/assets/favicon.ico",
      chunks: [],
      MODE: env.production ? "prod" : "dev",
      JSAPI: JSAPI_VERSION
    },
    {
      template: "src/iframe-inject-appcache-manifest.ejs",
      filename: "iframe-inject-appcache-manifest.html",
      inject: false
    },
    {
      template: "src/404.ejs",
      filename: "404.html",
      inject: false
    },
    {
      template: "src/oauth-callback.ejs",
      filename: "oauth-callback.html",
      inject: false
    }
  ];
}