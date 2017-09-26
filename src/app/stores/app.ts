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

import Authenticate = require("./../widgets/Authenticate");
import Directions from "./../widgets/Directions";

import {
  aliasOf,
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import { appId, webMapItem } from "../../config/main";

import { MDCTemporaryDrawer } from "@material/drawer/index";

interface Store {
  webmap: WebMap;
  view: MapView;
}

const { watch, whenOnce } = watchUtils;

const element = () => document.createElement("div");

const drawerEl = document.querySelector(".mdc-temporary-drawer") || element();
const drawerElem = new MDCTemporaryDrawer(drawerEl);

@subclass("app.stores.app")
class AppStore extends declared(Accessor) implements Store {
  @property() minimal = false;

  @property({ readOnly: true })
  webmap: WebMap = new WebMap(webMapItem);

  @property() signedIn = false;

  @property() view: MapView;

  @property() drawerSlider = drawerElem;

  @aliasOf("webmap.add") addLayer: (layer: __esri.Layer) => void;

  @aliasOf("view.ui.add") addToUI: (components: any) => void;

  constructor(params?: any) {
    super(params);

    document.querySelector(".app-menu").addEventListener("click", () => {
      drawerElem.open = true;
    });
  }

  loadWidgets() {
    const authNode = document.querySelector("authentication") || element();
    const searchNode = document.querySelector("search") || element();
    const directionsNode = document.querySelector("directions") || element();

    const login = new Authenticate({
      appId,
      container: authNode,
      showLabel: true
    });

    watch(login, "credential", credential => {
      this.signedIn = !!credential;
      this.drawerSlider.open = false;
    });

    whenOnce(this, "view")
      .then(({ value: view }) => {

        const directions = new Directions({
          container: directionsNode
        });

        login.view = view;
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
        this.addToUI(widgets);
      });
  }
}

export default new AppStore();
