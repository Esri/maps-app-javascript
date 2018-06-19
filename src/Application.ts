/*
  Copyright 2018 Esri
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

import Accessor from "esri/core/Accessor";
import Collection from "esri/core/Collection";
import { watch, whenTrue, whenTrueOnce } from "esri/core/watchUtils";

import Viewpoint from "esri/Viewpoint";
import MapView from "esri/views/MapView";
import WebMap from "esri/WebMap";

// Widgets
import BasemapGallery from "esri/widgets/BasemapGallery";
import Compass from "esri/widgets/Compass";
import Directions from "esri/widgets/Directions";
import Expand from "esri/widgets/Expand";
import Home from "esri/widgets/Home";
import Locate from "esri/widgets/Locate";
import Search from "esri/widgets/Search";
import Track from "esri/widgets/Track";

import Alert from "./widgets/Alert";
import UserNav from "./widgets/UserNav";
import WebMapBrowser from "./widgets/WebMapBrowser";

import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

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
  webmap = new WebMap(webMapItem);

  @property() signedIn = false;

  @property() view: MapView;

  async init() {
    // We are going to bind some widgets to pre-existing DOM elements
    const navNode: HTMLElement =
      document.querySelector("user-nav") || element();
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

    const basemapGallery = new BasemapGallery({ view });

    const directionsExpand = new Expand({
      view,
      expandIconClass: "esri-icon-directions",
      group: "right"
    });

    const basemapExpand = new Expand({
      view,
      content: basemapGallery,
      expandIconClass: "esri-icon-basemap",
      group: "right"
    });

    expandWidgets.addMany([directionsExpand, basemapExpand]);

    const browser = new WebMapBrowser({ view });
    const compass = new Compass({ view });
    const home = new Home({ view });
    const locate = new Locate({ view, scale: 1000 });
    const track = new Track({ view, scale: 1000 });

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
        view,
        searchProperties: {
          popupEnabled: true
        }
      });
      directionsExpand.content = directions;
      directionsHandle.remove();
      alertMessage.close();
      const browserExpand = new Expand({
        view,
        content: browser,
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
