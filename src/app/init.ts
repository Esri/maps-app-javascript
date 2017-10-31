import watchUtils = require("esri/core/watchUtils");
import MapView = require("esri/views/MapView");

import store from "./stores/app";

const { whenTrueOnce } = watchUtils;

export const empty = (element: Element) => (element.innerHTML = "");

export default function init() {
  store.loadWidgets();
  let viewDiv = document.querySelector("webmap") as HTMLDivElement;
  if (viewDiv) {
    empty(viewDiv);
  } else {
    viewDiv = document.createElement("div");
  }
  return whenTrueOnce(store, "signedIn").then(() => {
    const mapView = new MapView({ map: store.webmap, container: viewDiv });
    store.view = mapView;
    return store.view;
  });
}
