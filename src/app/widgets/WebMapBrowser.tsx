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

/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";

import { join, renderable, tsx } from "esri/widgets/support/widget";

import MapView = require("esri/views/MapView");
import Widget = require("esri/widgets/Widget");

import { PortalItem } from "./WebMapBrowser/components/PortalItem";
import WebMapBrowserViewModel from "./WebMapBrowser/WebMapBrowserViewModel";

import { asMonthDayYear } from "../utils/dateUtils";

import esri = __esri;

const CSS = {
  base: "browser esri-widget esri-widget--panel",
  container: "browser__item-container"
};

@subclass("app.widgets.WebMapBrowser")
class WebMapBrowser extends declared(Widget) {
  @property({
    type: WebMapBrowserViewModel
  })
  viewModel = new WebMapBrowserViewModel();

  @aliasOf("viewModel.view") view: MapView;

  @aliasOf("viewModel.portalItems") items: any[];

  constructor(params?: any) {
    super(params);
  }

  render() {
    const items = this.items.map((n, key) => {
      n.key = key;
      n.onClick = this.onItemClick;
      return PortalItem(n, this);
    });
    return (
      <div class={CSS.base}>
        <ul role="menu" class={CSS.container}>
          {items}
        </ul>
      </div>
    );
  }

  onItemClick(event: MouseEvent) {
    const id = (event.currentTarget as HTMLElement).dataset.id || "";
    this.items.forEach(a => (a.isActive = false));
    const item = this.items.find(a => a.id === id);
    item.isActive = true;
    this.viewModel.changeWebmap(id);
  }
}

export default WebMapBrowser;
