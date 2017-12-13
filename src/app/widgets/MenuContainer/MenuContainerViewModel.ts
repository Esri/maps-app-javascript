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
/// <amd-dependency path="esri/core/tsSupport/generatorHelper" name="__generator" />
/// <amd-dependency path="esri/core/tsSupport/awaiterHelper" name="__awaiter" />

import Accessor = require("esri/core/Accessor");

import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import { MDCTemporaryDrawer } from "@material/drawer/index";

interface MenuContainerViewModel {
  drawer: MDCTemporaryDrawer;
}

@subclass("app.widgets.MenuContainer.MenuContainerViewModel")
class MenuContainerViewModel extends declared(Accessor) {
  /**
   * Material Components Temporary Drawer.
   */
  @property() drawer: MDCTemporaryDrawer;

  /**
   * Will initialize the Material Drawer child component.
   * @param element
   */
  initDrawer(element: HTMLElement) {
    this.drawer = new MDCTemporaryDrawer(element);
  }

  /**
   * Open the drawer.
   */
  open() {
    if (this.drawer) {
      this.drawer.open = true;
    }
  }

  /**
   * Close the drawer.
   */
  close() {
    if (this.drawer) {
      this.drawer.open = false;
    }
  }
}

export default MenuContainerViewModel;
