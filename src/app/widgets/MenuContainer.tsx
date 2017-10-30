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

import { appId } from "../../config/main";

import { MDCTemporaryDrawer } from "@material/drawer/index";

import esri = __esri;

const CSS = {
  base: "directions"
};

@subclass()
class MenuContainer extends declared(Widget) {
  @property() drawer: MDCTemporaryDrawer;

  @property() auth: Authenticate;

  @aliasOf("auth.isSignedIn") signedIn: boolean;

  @property() view: MapView;

  constructor(params?: any) {
    super(params);
  }

  open() {
    this.drawer.open = true;
  }

  close() {
    this.drawer.open = false;
  }

  render() {
    return (
      <aside
        class="mdc-temporary-drawer mdc-typography"
        bind={this}
        afterCreate={this.handleMenuCreation}
      >
        <nav class="mdc-temporary-drawer__drawer">
          <header class="mdc-temporary-drawer__header">
            <div class="mdc-temporary-drawer__header-content">Maps App</div>
          </header>
          <nav
            id="icon-with-text-demo"
            class="mdc-temporary-drawer__content mdc-list"
          >
            <authentication
              bind={this}
              class="mdc-list-item margin-left-1"
              afterCreate={this.handleAuthButton}
            />
          </nav>
        </nav>
      </aside>
    );
  }

  private handleMenuCreation(element: any) {
    this.drawer = new MDCTemporaryDrawer(element);
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
