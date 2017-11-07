import watchUtils = require("esri/core/watchUtils");
import MapView = require("esri/views/MapView");

import store from "./stores/app";

const { whenTrueOnce } = watchUtils;

export const empty = (element: Element) => (element.innerHTML = "");

export default async function init(): Promise<void> {
  store.loadWidgets();
  let viewDiv = document.querySelector("webmap") as HTMLDivElement;
  if (viewDiv) {
    empty(viewDiv);
  } else {
    viewDiv = document.createElement("div");
  }
  await whenTrueOnce(store, "signedIn");
  store.view = new MapView({ map: store.webmap, container: viewDiv });
}
