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
import Compass from "esri/widgets/Compass";

import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import MapAction from "./MapAction";

interface NavigationOptions {
  view: MapView;
  compass: Compass;
}

@subclass("app.mapactions.NavRotation")
export class NavRotation extends declared(MapAction)<number> {
  @property() compass: Compass;

  constructor(params?: NavigationOptions) {
    super(params);
    this.handleRotation = this.handleRotation.bind(this);
    if (this.view) {
      this.addListeners();
    }
    this.watch("view", () => {
      this.addListeners();
    });
  }

  addListeners() {
    const handler = this.view.watch("rotation", this.handleRotation);
    this.handlers.push(handler);
  }

  handleRotation(rotation: number) {
    if (rotation === 0) {
      this.view.ui.remove(this.compass);
    } else {
      this.view.ui.add(this.compass, "top-left");
    }
    this.value = rotation;
  }
}

export function applyNavRotationAction(view: MapView, compass: Compass) {
  const action = new NavRotation({ view, compass });
  return action;
}
