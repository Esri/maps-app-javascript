import Locator = require("esri/tasks/Locator");
import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");

import { geocodeUrl } from "../../config/main";

const DISTANCE = 500;

interface GeocodeOptions {
  mapPoint: __esri.Point;
  view: MapView | SceneView;
}

const locator = new Locator({
  url: geocodeUrl
});

export function reverseGeocode({ mapPoint, view }: GeocodeOptions) {
  return locator.locationToAddress(mapPoint, DISTANCE);
}

export function applyBehavior(
  view: MapView | SceneView,
  callback: (address: string) => any
): any {
  locator.outSpatialReference = view.spatialReference;

  const handler = view.on("hold", ({ mapPoint }) => {
    reverseGeocode({ mapPoint, view }).then(({ address }) => {
      callback(address);
    });
  });

  const behavior = {
    disable() {
      handler.remove();
    }
  };

  return behavior;
}
