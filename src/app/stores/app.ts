/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Accessor = require("esri/core/Accessor");
import promiseUtils = require("esri/core/promiseUtils");
import watchUtils = require("esri/core/watchUtils");

import Credential = require("esri/identity/Credential");

import FeatureLayer = require("esri/layers/FeatureLayer");

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

import MenuContainer from "./../widgets/MenuContainer";

import {
  aliasOf,
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import { appId, webMapItem } from "../config";

interface Store {
  webmap: WebMap;
  view: MapView;
}

const { watch, whenOnce } = watchUtils;

const element = () => document.createElement("div");

@subclass("app.stores.app")
class AppStore extends declared(Accessor) implements Store {
  @property() minimal = false;

  @property({ readOnly: true })
  webmap: WebMap = new WebMap(webMapItem);

  @property() signedIn = false;

  @property() view: MapView;

  @property() menuContainer: MenuContainer;

  constructor(params?: any) {
    super(params);

    const menu = document.querySelector(".app-menu");
    if (menu) {
      menu.addEventListener("click", () => {
        this.menuContainer.open();
      });
    }
  }

  async loadWidgets() {
    const menuNode = (document.querySelector("menu-container") ||
      element()) as HTMLElement;
    const authNode = (document.querySelector("authentication") ||
      element()) as HTMLElement;
    const searchNode = (document.querySelector("search") ||
      element()) as HTMLElement;

    this.menuContainer = new MenuContainer({
      container: menuNode
    });

    watch(this, "menuContainer.signedIn", credential => {
      this.signedIn = !!credential;
      this.menuContainer.close();
    });

    const { value: view } = await whenOnce(this, "view");
    const directions = new Directions({
      container: element(),
      view
    });

    const search = new Search({
      container: searchNode,
      view
    });

    const basemapGallery = new BasemapGallery({
      container: element(),
      view
    });

    const locate = new Locate({ view });

    const widgets = [
      {
        component: new Home({
          container: element(),
          view
        }),
        position: "top-left"
      },
      {
        component: new Expand({
          view,
          content: directions.container,
          expandIconClass: "esri-icon-directions"
        }),
        position: "top-right"
      },
      {
        component: new Expand({
          view,
          content: basemapGallery.container,
          expandIconClass: "esri-icon-basemap"
        }),
        position: "top-right"
      },
      {
        component: locate,
        position: "bottom-right"
      },
      {
        component: new Compass({
          container: element(),
          view
        }),
        position: "top-left"
      }
    ];
    return this.view.ui.add(widgets);
  }
}

export default new AppStore();
