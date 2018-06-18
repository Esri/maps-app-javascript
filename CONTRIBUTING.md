Contributing to maps-app-javascript
=================================

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

 1. [Getting Involved](#getting-involved)
 2. [Reporting Bugs](#reporting-bugs)
 3. [Contributing Code](#contributing-code)

## Getting Involved

Third-party patches are absolutely essential on our quest to create the best maps app with the ArcGIS API for JavaScript.
However, they're not the only way to get involved with the development of maps-app-javascript.
You can help the project tremendously by discovering and [reporting bugs](#reporting-bugs),
[improving documentation](#improving-documentation),
helping others with [GitHub issues](https://github.com/Esri/maps-app-javascript/issues),
tweeting to [@ArcGISJSAPI](https://twitter.com/ArcGISJSAPI),
and spreading the word about mapps-app-javascript and the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) among your colleagues and friends.

## Reporting Bugs

Before reporting a bug on the project's [issues page](https://github.com/Esri/maps-app-javascript/issues),
first make sure that your issue is caused by maps-app-javascript, not your application code.
Second, search through the reported issues for your issue,
and if it's already reported, just add any additional details in the comments.

Also, please only report issues related to the maps-app-javascript.
If your issue is related to the ArcGIS API for JavaScript, please contact [Esri Tech Support](https://support.esri.com/contact-tech-support) or ask the Esri community on [GeoNet](https://geonet.esri.com/community/developers/web-developers/arcgis-api-for-javascript).

After you made sure that you've found a new maps-app-javascript bug,
please use the provided issue template when creating your issue.

## Contributing Code

### Setting up your dev environment
Please read the instructions provided in the [readme](https://github.com/Esri/maps-app-javascript/blob/master/README.md) to set up your development environment.

#### Fork the repo
If you haven't already, go to https://github.com/Esri/maps-app-javascript and click the [Fork](https://github.com/Esri/maps-app-javascript/fork) button.

#### Clone the repo
Clone the repo and run `npm install`.

* _NOTE FOR WINDOWS USERS_ - You will need to install the [Windows-Build-Tools](https://github.com/felixrieseberg/windows-build-tools) to compile npm modules for this project. `npm install --global --production windows-build-tools`

* `npm start` - compile application and run it in a local server at `http://localhost:8080/`.
* `npm run build` - compile application for deployment.
* `npm test` - run unit tests with local chrome driver.
* `npm run serve` - Run a production build of the application, but serve it up locally to see how the built app will behave.

Use `npm run serve` to full test that Service Workers are working correctly with `webpack-dev-server` self signed certifcates. Refer to [this article](https://deanhume.com/testing-service-workers-locally-with-self-signed-certificates/) on how to run Chrome with proper flags enabled for development purposes. 

#### Configure remotes
Move into the directory the cloning process just created (should be maps-app-javascript), then make sure your local git knows about all the remotes and branches.
```
$ cd maps-app-javascript
# Changes the active directory in the prompt to the newly cloned "maps-app-javascript" directory
$ git remote add upstream https://github.com/Esri/maps-app-javascript.git
# Assigns the original repository to a remote called "upstream"
$ git fetch upstream
# Pulls in changes not present in your local repository, without modifying your files
```

* Ask the Esri community in the Example Apps Group on [GeoNet](https://community.esri.com/groups/arcgis-example-apps).
