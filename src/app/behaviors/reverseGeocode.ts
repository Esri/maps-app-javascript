/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Locator = require("esri/tasks/Locator");
import MapView = require("esri/views/MapView");

import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import { geocodeUrl } from "../../config/main";

import Behavior from "./Behavior";

import esri = __esri;

interface GeocodeOptions {
  mapPoint: esri.Point;
}

interface ReverseGeocodeOptions {
  view: MapView;
}

@subclass("app.behaviors.ReverseGeocode")
export class ReverseGeocode extends declared(Behavior)<string> {
  @property() distance = 500;

  @property()
  locator = new Locator({
    url: geocodeUrl
  });

  constructor(params?: ReverseGeocodeOptions) {
    super(params);
    this.reverseGeocode = this.reverseGeocode.bind(this);
    this.watch("view", () => {
      this.locator.outSpatialReference = this.view.spatialReference;
      const handler = this.view.on("hold", this.reverseGeocode);
      this.handlers.push(handler);
    });
  }

  reverseGeocode({ mapPoint }: GeocodeOptions) {
    this.locator
      .locationToAddress(mapPoint, this.distance)
      .then(({ address }) => {
        this.value = address;
      })
      .otherwise(error => console.warn(error)); // tslint:disable-line: no-console
  }
}

export function applyBehavior(view: MapView): any {
  const behavior = new ReverseGeocode({ view });
  return behavior;
}
