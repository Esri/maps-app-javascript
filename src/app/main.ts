import watchUtils = require("esri/core/watchUtils");
import MapView = require("esri/views/MapView");

import store from "./stores/app";

import { portalUrl } from "../config/main";

const { whenTrueOnce } = watchUtils;

const empty = (element: Element) => (element.innerHTML = "");

const start = () => {
  store.loadWidgets();
  let viewDiv = document.querySelector("webmap") as HTMLDivElement;
  if (viewDiv) {
    empty(viewDiv);
  }
  else {
    viewDiv = document.createElement("div");
  }
  whenTrueOnce(store, "signedIn")
    .then(() => {
      const mapView = new MapView({ map: store.webmap, container: viewDiv });
      store.view = mapView;
      return store.view;
    });
};

start();
