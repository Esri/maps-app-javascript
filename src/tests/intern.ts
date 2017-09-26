// Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
// specified browser environments in the `environments` array below as well. See
// https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
// https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
// Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
// automatically
export const capabilities = {
  "browserstack.debug": false,
  project: "ArcGIS Demo App",
  name: "esrijs-demo"
};

export const maxConcurrency = 3;

// Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
// can be used here
export const loaderOptions = {
  // Packages that should be registered with the loader in each testing environment
  packages: [
    { name: "dist", location: "dist" },
    {
      name: "dojo",
      location: "https://js.arcgis.com/4.3/dojo"
    },
    {
      name: "dijit",
      location: "https://js.arcgis.com/4.3/dijit"
    },
    {
      name: "dojox",
      location: "https://js.arcgis.com/4.3/dojox"
    },
    {
      name: "dgrid",
      location: "https://js.arcgis.com/4.3/dgrid"
    },
    {
      name: "dstore",
      location: "https://js.arcgis.com/4.3/dstore"
    },
    {
      name: "moment",
      location: "https://js.arcgis.com/4.3/moment"
    },
    {
      name: "esri",
      location: "https://js.arcgis.com/4.3/esri"
    },
    {
      name: "chai",
      location: "node_modules/chai",
      main: "chai"
    },
    {
      name: "sinon",
      location: "node_modules/sinon/pkg",
      main: "sinon"
    },
    {
      name: "testdouble",
      location: "node_modules/testdouble/dist",
      main: "testdouble"
    },
    { name: "grunt-dojo2", location: "node_modules/grunt-dojo2" }
  ]
};

// Non-functional test suite(s) to run in each browser
export const suites = ["dist/tests/unit/**/*"];

// A regular expression matching URLs to files that should not be included in code coverage analysis
export const excludeInstrumentation = /(?:node_modules|libs|public|configs|typings|tests|nls|interfaces)[\/\\]/;
