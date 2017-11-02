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
import Expand = require("esri/widgets/Expand");
import Home = require("esri/widgets/Home");
import Locate = require("esri/widgets/Locate");
import Search = require("esri/widgets/Search");

import Directions from "./../widgets/Directions";
import MenuContainer from "./../widgets/MenuContainer";

import { applyBehavior } from "./../behaviors/reverseGeocode";

import {
  aliasOf,
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import { appId, webMapItem } from "../../config/main";

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

  @aliasOf("webmap.add") addLayer: (layer: __esri.Layer) => void;

  @aliasOf("view.ui.add") addToUI: (components: any) => void;

  constructor(params?: any) {
    super(params);

    const menu = document.querySelector(".app-menu");
    if (menu) {
      menu.addEventListener("click", () => {
        this.menuContainer.open();
      });
    }
  }

  loadWidgets() {
    const menuNode = (document.querySelector("menu-container") ||
      element()) as HTMLElement;
    const authNode = (document.querySelector("authentication") ||
      element()) as HTMLElement;
    const searchNode = (document.querySelector("search") ||
      element()) as HTMLElement;
    const directionsNode = (document.querySelector("directions") ||
      element()) as HTMLElement;

    this.menuContainer = new MenuContainer({
      container: menuNode
    });
    watch(this, "menuContainer.signedIn", credential => {
      this.signedIn = !!credential;
      this.menuContainer.close();
    });

    return whenOnce(this, "view")
      .then(({ value: view }) => {
        const directions = new Directions({
          container: directionsNode
        });

        directions.view = view;

        const search = new Search({
          container: searchNode,
          view
        });

        directions.search = search;

        const basemapGallery = new BasemapGallery({
          container: element(),
          view
        });

        const locate = new Locate({ view });

        directions.locate = locate;

        applyBehavior(view, search);

        return [
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
      })
      .then(widgets => {
        return this.addToUI(widgets);
      });
  }
}

export default new AppStore();
