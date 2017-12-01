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

import {
  aliasOf,
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import { join, renderable, tsx } from "esri/widgets/support/widget";

import Authenticate = require("./Authenticate");

import MapView = require("esri/views/MapView");
import Widget = require("esri/widgets/Widget");

import { appId } from "../config";

import { MDCTemporaryDrawer } from "@material/drawer/index";

import esri = __esri;

const CSS = {
  base: "directions",
  drawer: "mdc-temporary-drawer mdc-typography",
  drawerClose: "drawer-close",
  drawerContent: "mdc-temporary-drawer__content",
  drawerNav: "mdc-temporary-drawer__drawer",
  drawerHeader: "mdc-temporary-drawer__header",
  drawerHeaderContent: "mdc-temporary-drawer__header-content",
  list: "mdc-list",
  listItem: "mdc-list-item margin-left-1",
  icon: "svg-icon"
};

@subclass("app.widgets.MenuContainer")
class MenuContainer extends declared(Widget) {
  @property() drawer: MDCTemporaryDrawer;

  @property() auth: Authenticate;

  @aliasOf("auth.isSignedIn") signedIn: boolean;

  @property() view: MapView;

  open() {
    this.drawer.open = true;
  }

  close() {
    this.drawer.open = false;
  }

  render() {
    return (
      <aside
        class={CSS.drawer}
        bind={this}
        afterCreate={this.handleMenuCreation}
      >
        <nav class={CSS.drawerNav}>
          <header class={CSS.drawerHeader}>
            <div bind={this} class={CSS.drawerClose} onclick={this.close}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class={CSS.icon}
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <path d="M25 28h-5L8 16 20 4h5L13 16l12 12z" />
              </svg>
            </div>
            <div class={CSS.drawerHeaderContent}>Maps App</div>
          </header>
          <nav class={join(CSS.drawerContent, CSS.list)}>
            <authentication
              bind={this}
              class={CSS.listItem}
              afterCreate={this.handleAuthButton}
            />
          </nav>
        </nav>
      </aside>
    );
  }

  private handleMenuCreation(element: any) {
    this.drawer = new MDCTemporaryDrawer(element);
    // default to open drawer to sign in
    // if not currently signed in
    setTimeout(() => {
      if (!this.signedIn) {
        this.open();
      }
    }, 500);
  }

  private handleAuthButton(element: any) {
    this.auth = new Authenticate({
      appId,
      container: element,
      showLabel: true
    });
  }
}

export default MenuContainer;
