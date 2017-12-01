# Maps App JavaScipt

This repo provides an example app called Maps App that can be used as as starter for your organizations mapping app built with [ArcGIS API 4 for JavaScript](https://developers.arcgis.com/javascript/). You can use the Maps App as is, or extend it using the ArcGIS API for JavaScript.

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

The [Drawer](https://material.io/components/web/catalog/drawers/) used is from the [Material Components of the Web](https://material.io/components/web/) library.

Feel free to use this project as a starting point for your own applications!

## Usage

Clone the repo and run `npm install`.

* `npm start` - compile application and run it in a local server at `http://localhost:8080`.
* `npm run build` - compile application for deployment that can be viewed at `http://localhost:9000`.
* `npm test` - run unit tests and code coverage with local chrome driver.

The ports for running the local server can be updated in `webpack/devserver.config.js` for dev and `package.json` for build.

* Login to [ArcGIS for Developers](https://developers.arcgis.com/) and [register](https://developers.arcgis.com/applications/#/) your app to create an Client ID.

* You will need to register your application with a Client ID so that you can take advantage of the premium [Directions and Routing](https://developers.arcgis.com/features/directions/) and [Geocoding](https://developers.arcgis.com/features/geocoding/) Services from the ArcGIS Platform.

![](images/Register1.png)
* Once you've registered your version of the maps-app, grab a copy of the client id from the registration and set the client id in the applications `src/app/config.ts` file. You will also want to provide the Portal URL for your Organization, such as `"https://<MY-ORGANIZATION>.maps.arcgis.com"`. You can also provide your own WebMap or use the default one provided.

```js
// src/app/config.ts
export const appId = "<APP-ID>";

export const portalUrl = "<PORTAL-URL>";

export const webMapItem = {
  portalItem: {
    id: "<WEBMAP-ID>"
  }
};
```

* As part of the registration process, add a redirect uri for your app.  Navigate to the Redirect URIs section at the bottom of the registration page and set the redirect uri as shown for development purposes. You will also want to add a redirect uri for where your application will be deployed.  This redirect uri is the default redirect for `https://www.arcgis.com`.

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
Copyright 2017 Esri

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.