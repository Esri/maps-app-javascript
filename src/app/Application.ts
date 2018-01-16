/*
  Copyright 2017 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/// <amd-dependency path="esri/core/tsSupport/assignHelper" name="__assign" />
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
/// <amd-dependency path="esri/core/tsSupport/generatorHelper" name="__generator" />
/// <amd-dependency path="esri/core/tsSupport/awaiterHelper" name="__awaiter" />

import Accessor = require("esri/core/Accessor");
import Collection = require("esri/core/Collection");
import { watch, whenTrue, whenTrueOnce } from "esri/core/watchUtils";

import Viewpoint = require("esri/Viewpoint");
import MapView = require("esri/views/MapView");
import WebMap = require("esri/WebMap");

// Widgets
import BasemapGallery = require("esri/widgets/BasemapGallery");
import Compass = require("esri/widgets/Compass");
import Directions = require("esri/widgets/Directions");
import Expand = require("esri/widgets/Expand");
import Home = require("esri/widgets/Home");
import Locate = require("esri/widgets/Locate");
import Search = require("esri/widgets/Search");
import Track = require("esri/widgets/Track");

import Alert from "./widgets/Alert";
import Browser from "./widgets/Bowser";
import UserNav from "./widgets/UserNav";

import { declared, property, subclass } from "esri/core/accessorSupport/decorators";

import { viewOptions, webMapItem } from "./config";

import { applyNavRotationAction } from "./mapactions/navRotation";
import { applyReverseGeocodeAction } from "./mapactions/reverseGeocode";

const element = () => document.createElement("div");

export const empty = (el: Element) => (el.innerHTML = "");

export const locateOnStart = async (view: MapView, locate: Locate) => {
  await view.when();
  locate.goToLocationEnabled = false;
  await locate.locate();
  const vp = new Viewpoint({
    scale: viewOptions.scale,
    targetGeometry: locate.graphic.geometry
  });
  await view.goTo(vp);
  locate.goToLocationEnabled = true;
};

export const collapseAll = (widgets: Collection<Expand>) => () => {
  widgets.forEach(w => w.collapse());
};

@subclass("app.widgets.Application")
class Application extends declared(Accessor) {
  @property({ readOnly: true })
  webmap: WebMap = new WebMap(webMapItem);

  @property() signedIn = false;

  @property() view: MapView;

  async init() {
    // We are going to bind some widgets to pre-existing DOM elements
    const navNode: HTMLElement = document.querySelector("user-nav") || element();
    const alertNode: HTMLElement = document.querySelector("alert") || element();

    let viewNode = document.querySelector("webmap") as HTMLDivElement;
    if (viewNode) {
      empty(viewNode);
    } else {
      viewNode = element();
    }

    const userNav = new UserNav({
      container: navNode
    });

    // sync the signed in status of the UserNav with the application
    watch(userNav, "signedIn", signedIn => (this.signedIn = signedIn));

    this.view = new MapView({ map: this.webmap, container: viewNode });
    const view = this.view;

    userNav.view = view;

    // Alert is used to notify users to login if they want to use
    // directions widget
    const alertMessage = new Alert({
      container: alertNode,
      message: "Please Sign In to use Directions",
      color: "red",
      isFull: true
    });

    /**
     * These widgets are going to be added to
     * Expand widgets, so they need a container
     * element when initialized.
     */

    const expandWidgets = new Collection();

    const search = new Search({ view });

    const basemapGallery = new BasemapGallery({
      container: element(),
      view
    });

    const directionsExpand = new Expand({
      view,
      expandIconClass: "esri-icon-directions",
      group: "right"
    });

    const basemapExpand = new Expand({
      view,
      content: basemapGallery.container,
      expandIconClass: "esri-icon-basemap",
      group: "right"
    });

    expandWidgets.addMany([directionsExpand, basemapExpand]);

    const browser = new Browser({
      container: element(),
      view
    });

    const compass = new Compass({ view });
    const home = new Home({ view });
    const locate = new Locate({ view });
    const track = new Track({ view });

    // we want to collaplse all expand widgets when search gets focus
    // because the suggestions list will cover the widgets anyway
    search.on("search-focus", collapseAll(expandWidgets));

    // Add a reverse geocode action to MapView
    applyReverseGeocodeAction(view, search);
    // Add nav rotation check to MapView
    // this action will manage adding/remove widget to view
    applyNavRotationAction(view, compass);

    // Wait for user to login to add Directions widget
    const directionsHandle = whenTrue(directionsExpand, "expanded", () => {
      directionsExpand.collapse();
      alertMessage.open();
    });

    // when user is signed in
    // add the Directions widget to the application
    whenTrueOnce(this, "signedIn").then(() => {
      const directions = new Directions({
        container: element(),
        view
      });
      directionsExpand.content = directions.container;
      directionsHandle.remove();
      alertMessage.close();
      const browserExpand = new Expand({
        view,
        content: browser.container,
        expandIconClass: "esri-icon-collection",
        group: "right"
      });
      view.ui.add(browserExpand, "top-right");
      expandWidgets.add(browserExpand);
      browser.viewModel.fetchItems();
    });

    // Create array of widgets with positions to add to MapView
    const widgets = [
      {
        component: home,
        position: "top-left"
      },
      {
        component: track,
        position: "top-left"
      },
      {
        component: search,
        position: "top-right"
      },
      {
        component: directionsExpand,
        position: "top-right"
      },
      {
        component: basemapExpand,
        position: "top-right"
      },
      {
        component: locate,
        position: "bottom-right"
      }
    ];
    this.view.ui.add(widgets);

    // Go to users location on startup
    return locateOnStart(view, locate);
  }
}

export default new Application();
