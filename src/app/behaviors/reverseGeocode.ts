import Locator = require("esri/tasks/Locator");
import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");

import { geocodeUrl } from "../../config/main";

const DISTANCE = 500;

interface GeocodeOptions {
  mapPoint: __esri.Point;
}

const locator = new Locator({
  url: geocodeUrl
});

export function reverseGeocode({ mapPoint }: GeocodeOptions) {
  return locator.locationToAddress(mapPoint, DISTANCE);
}

export function applyBehavior(
  view: MapView | SceneView,
  callback: (address: string) => any
): any {
  locator.outSpatialReference = view.spatialReference;

  const handler = view.on("hold", ({ mapPoint }) => {
    reverseGeocode({ mapPoint }).then(({ address }) => {
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
