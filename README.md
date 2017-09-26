# Maps App JavaScipt

This repo provides an example app called Maps App that can be used as as starter for your organizations mapping app built with [ArcGIS API 4 for JavaScript](https://developers.arcgis.com/javascript/). You can use the Maps App as is, or extend it using the ArcGIS API for JavaScript.

## Features
 * Dynamically switch basemaps
 * Place search
 * Routing
 * Geocode addresses
 * Reverse geocode _in progress_
 * Sign into an ArcGIS account
 * Service Worker
 * AppCache
 * `manifest.json` - to add as button to home screen
 * default icons

> Note - Be careful of how aggressive you cache via the service worker, you run the risk of not getting the latest data from Services that can change with updates. This is one area of this app I would call highly experimental.

## Usage

Clone the repo and run `npm install`.

* `npm run serve` - compile application and run it in a local server.
* `npm run webpack` - compile application for deployment.


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