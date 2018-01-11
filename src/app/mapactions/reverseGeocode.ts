/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
/// <amd-dependency path="esri/core/tsSupport/generatorHelper" name="__generator" />
/// <amd-dependency path="esri/core/tsSupport/awaiterHelper" name="__awaiter" />

import MapView = require("esri/views/MapView");
import Search = require("esri/widgets/Search");

import { declared, property, subclass } from "esri/core/accessorSupport/decorators";

import MapAction from "./MapAction";

import esri = __esri;

interface GeocodeOptions {
  mapPoint: esri.Point;
}

interface ReverseGeocodeOptions {
  view: MapView;
  search: esri.Search;
}

@subclass("app.mapactions.ReverseGeocode")
export class ReverseGeocode extends declared(MapAction)<esri.SearchResponse> {
  @property() search: Search;

  constructor(params?: ReverseGeocodeOptions) {
    super(params);
    this.reverseGeocode = this.reverseGeocode.bind(this);
    if (this.view) {
      this.addListeners();
    }
    this.watch("view", () => {
      this.addListeners();
    });
  }

  addListeners() {
    const handler = this.view.on("hold", this.reverseGeocode);
    this.handlers.push(handler);
  }

  async reverseGeocode({ mapPoint }: GeocodeOptions) {
    const response = await this.search.search(mapPoint);
    this.value = response;
  }
}

export function applyReverseGeocodeAction(view: MapView, search: Search) {
  const action = new ReverseGeocode({ view, search });
  return action;
}
