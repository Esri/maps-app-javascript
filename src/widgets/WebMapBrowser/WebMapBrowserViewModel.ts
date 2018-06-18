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

import esri = __esri;

import Accessor from "esri/core/Accessor";
import Collection from "esri/core/Collection";
import Portal from "esri/portal/Portal";
import PortalQueryParams from "esri/portal/PortalQueryParams";
import MapView from "esri/views/MapView";
import WebMap from "esri/WebMap";

import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

export interface BrowserParams extends esri.WidgetProperties {
  appId: string;
}

const WebMapCollection = Collection.ofType(WebMap);

const fst: (xs: string[]) => string = xs => xs[0] || "1";

@subclass("app.widgets.Browser.BrowserViewModel")
class BrowserViewModel extends declared(Accessor) {
  @property() view: MapView;

  @property() portal = new Portal();

  @property() webmaps = new WebMapCollection();

  @property() portalItems: any[] = [];

  constructor(params?: BrowserParams) {
    super(params);
  }

  async changeWebmap(id: string) {
    const webmap = this.webmaps.find(({ portalItem }) => portalItem.id === id);
    await webmap.load();
    const version = (webmap as any).resourceInfo.version;
    const majorVersion = fst(version.split("."));
    if (majorVersion === "1") {
      return;
    }
    this.view.map = webmap;
    this.view.extent = webmap.portalItem.extent;
    return webmap.when();
  }

  async fetchItems() {
    await this.portal.load();
    const queryParams = new PortalQueryParams({
      query: `type: "Web Map" -Application AND owner: ${
        this.portal.user.username
      }`,
      sortField: "numViews",
      sortOrder: "desc",
      num: 100
    });
    const { results } = await this.portal.queryItems(queryParams);
    this.portalItems = results.map(a => {
      a.isActive = false;
      a.isSelected = false;
      return a;
    });
    this.webmaps.addMany(
      results.map(
        ({ id }) =>
          ({
            portalItem: { id }
          } as any)
      )
    );
  }
}

export default BrowserViewModel;
