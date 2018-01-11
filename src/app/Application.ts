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

/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
/// <amd-dependency path="esri/core/tsSupport/generatorHelper" name="__generator" />
/// <amd-dependency path="esri/core/tsSupport/awaiterHelper" name="__awaiter" />

import Accessor = require("esri/core/Accessor");
import { watch, whenTrueOnce } from "esri/core/watchUtils";

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

import UserNav from "./widgets/UserNav";

import { declared, property, subclass } from "esri/core/accessorSupport/decorators";

import { appId, webMapItem } from "./config";

const element = () => document.createElement("div");

export const empty = (el: Element) => (el.innerHTML = "");

@subclass("app.widgets.Application")
class Application extends declared(Accessor) {
  @property({ readOnly: true })
  webmap: WebMap = new WebMap(webMapItem);

  @property() signedIn = false;

  @property() view: MapView;

  async loadWidgets() {
    // We are going to bind some widgets to pre-existing DOM elements
    const navNode: HTMLElement = document.querySelector("user-nav") || element();

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

    await whenTrueOnce(this, "signedIn");

    this.view = new MapView({ map: this.webmap, container: viewNode });
    const view = this.view;

    userNav.view = view;

    /**
     * These widgets are going to be added to
     * Expand widgets, so they need a container
     * element when initialized.
     */
    const search = new Search({
      container: element(),
      view
    });

    const directions = new Directions({
      container: element(),
      view
    });

    const basemapGallery = new BasemapGallery({
      container: element(),
      view
    });

    // Create array of widgets with positions to add to MapView
    const widgets = [
      {
        component: new Home({
          container: element(),
          view
        }),
        position: "top-left"
      },
      {
        component: new Search({
          view
        }),
        position: "top-right"
      },
      {
        component: new Expand({
          view,
          content: directions.container,
          expandIconClass: "esri-icon-directions",
          group: "right"
        }),
        position: "top-right"
      },
      {
        component: new Expand({
          view,
          content: basemapGallery.container,
          expandIconClass: "esri-icon-basemap",
          group: "right"
        }),
        position: "top-right"
      },
      {
        component: new Locate({ view }),
        position: "bottom-right"
      },
      {
        component: new Compass({ view }),
        position: "top-left"
      }
    ];
    return this.view.ui.add(widgets);
  }
}

export default new Application();
