/*
  Copyright 2018 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import MapView from "esri/views/MapView";
import Search from "esri/widgets/Search";

import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import MapAction from "./MapAction";

import esri = __esri;

interface GeocodeOptions {
  mapPoint: esri.Point;
}

interface ReverseGeocodeOptions {
  view: MapView;
  search: Search;
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
