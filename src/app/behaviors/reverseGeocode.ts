/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Locator = require("esri/tasks/Locator");
import MapView = require("esri/views/MapView");

import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import Behavior from "./Behavior";

import esri = __esri;

interface GeocodeOptions {
  mapPoint: esri.Point;
}

interface ReverseGeocodeOptions {
  view: MapView;
  search: esri.Search;
}

@subclass("app.behaviors.ReverseGeocode")
export class ReverseGeocode extends declared(Behavior)<string> {
  @property() search: esri.Search;

  constructor(params?: ReverseGeocodeOptions) {
    super(params);
    this.reverseGeocode = this.reverseGeocode.bind(this);
    this.watch("view", () => {
      const handler = this.view.on("hold", this.reverseGeocode);
      this.handlers.push(handler);
    });
  }

  reverseGeocode({ mapPoint }: GeocodeOptions) {
    this.search.search(mapPoint).then(({ results }) => {
      if (
        results.length &&
        results[0] &&
        results[0].results &&
        results[0].results[0]
      ) {
        const result = results[0].results[0];
        this.search.search(result.name);
      }
    });
  }
}

export function applyReverseGeocodeBehavior(
  view: MapView,
  search: esri.Search
): any {
  const behavior = new ReverseGeocode({ view, search });
  return behavior;
}
