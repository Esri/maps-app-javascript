[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


# Maps App JavaScipt

This repo provides an example app called [Maps App](https://developers.arcgis.com/example-apps/maps-app-javascript/?utm_source=github&utm_medium=web&utm_campaign=example_apps_maps_app_javascript) that can be used as as starter for your organizations mapping app built with [ArcGIS API 4 for JavaScript](https://developers.arcgis.com/javascript/). You can use the Maps App as is, or extend it using the ArcGIS API for JavaScript.

## Features
 * Dynamically switch basemaps
 * Place search
 * Directions
 * Sign into an ArcGIS account
 * Service Worker
 * AppCache
 * `manifest.json` - to add as button to home screen
 * default icons

This application takes advantage of numerous technologies for development purposes. It utlizes [webpack](https://webpack.js.org/) to compile and bundle the application code and other files. It is written in [TypeScript](http://www.typescriptlang.org/) and provides examples on how to create [custom widgets](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html) using the [ArcGIS API 4 for JavaScript](https://developers.arcgis.com/javascript/).

This application also uses [Workbox for Webpack](https://developers.google.com/web/tools/workbox/get-started/webpack) to set up [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) for the application to cache application code and files, as well as uses an [appcache fallback](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) for Internet Explorer, Edge, and Safari.

[Intern](https://theintern.io/) is used for all unit tests and code coverage.

Feel free to use this project as a starting point for your own applications!

## Usage

Clone the repo and run `npm install`.

* _NOTE FOR WINDOWS USERS_ - You will need to install the [Windows-Build-Tools](https://github.com/felixrieseberg/windows-build-tools) to compile npm modules for this project. `npm install --global --production windows-build-tools`

* `npm start` - compile application and run it in a local server at `http://localhost:8080/`.
* `npm run build` - compile application for deployment.
* `npm test` - run unit tests with local chrome driver.
* `npm run serve` - Run a production build of the application, but serve it up locally to see how the built app will behave.

Use `npm run serve` to full test that Service Workers are working correctly with `webpack-dev-server` self signed certifcates. Refer to [this article](https://deanhume.com/testing-service-workers-locally-with-self-signed-certificates/) on how to run Chrome with proper flags enabled for development purposes. 

* Login to [ArcGIS for Developers](https://developers.arcgis.com/) and [register](https://developers.arcgis.com/applications/#/) your app to create an Client ID.

* You will need to register your application with a Client ID so that you can take advantage of the premium [Directions and Routing](https://developers.arcgis.com/features/directions/) and [Geocoding](https://developers.arcgis.com/features/geocoding/) Services from the ArcGIS Platform.

![](images/Register1.png)
* Once you've registered your version of the maps-app, grab a copy of the client id from the registration and set the client id in the applications `src/app/config.ts` file. You will also want to provide the Portal URL for your Organization, such as `"https://<MY-ORGANIZATION>.maps.arcgis.com"`. You can also provide your own WebMap or use the default one provided.

```js
// src/app/config.ts
/**
 * Registered application id.
 * This is needed to be able to use premium
 * services such as routing and directions.
 */
export const appId = "<APP-ID>";

/**
 * Users Portal URL.
 */
export const portalUrl = "https://arcgis.com"; // default Portal URL

/**
 * WebMap id to use for this application.
 * You can update this WebMap id with your own.
 */
export const webMapItem = {
  portalItem: {
    // shared WebMap with Vector Tile basemap
    id: "1aab2defd7444b6790f439a186cd4a23"
  }
};
```

* As part of the registration process, add a redirect uri for your app.  Navigate to the Redirect URIs section at the bottom of the registration page and set the redirect uri as shown for development purposes. You will also want to add a redirect uri for where your application will be deployed.  This redirect uri is the default redirect for `https://www.arcgis.com`.

For development purposes, you will want to add the following redirects to your Application ID:

* `http://127.0.0.1:8080`

When you deploy your application, do not use the same Application ID for development as production. You want your Application ID to _only redirect to your production website_.

![](images/Register2.png)

## Demo

![application](images/maps-app.gif)

## Issues
Find a bug or want to request a new feature enhancement?  Let us know by submitting an issue.

## Contributing
Anyone and everyone is welcome to [contribute](CONTRIBUTING.md). We do accept pull requests.

1. Get involved
2. Report issues
3. Contribute code
4. Improve documentation

## Licensing
Copyright 2018 Esri

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

A copy of the license is available in the repository's [LICENSE](./LICENSE) file
