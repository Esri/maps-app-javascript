/*
  Copyright 2017 Esri
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

/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Accessor = require("esri/core/Accessor");
import Collection = require("esri/core/Collection");
import MapView = require("esri/views/MapView");

import { declared, property, subclass } from "esri/core/accessorSupport/decorators";

import esri = __esri;

@subclass("app.mapactions.MapAction")
export default abstract class MapAction<T> extends declared(Accessor) {
  @property() value: T;

  handlers: Collection<esri.WatchHandle> = new Collection();

  @property() view: MapView;

  subscribe(callback: (value: T) => void) {
    const handler = this.watch("value", callback);
    this.handlers.add(handler);
    return handler;
  }

  unsubscribe() {
    this.handlers.map(x => x.remove);
    this.handlers.removeAll();
  }
}
