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

import {
  aliasOf,
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import { renderable, tsx } from "esri/widgets/support/widget";

import Authenticate from "./Authenticate";

import MapView from "esri/views/MapView";
import Widget from "esri/widgets/Widget";

import { dropdown } from "calcite-web";

import { appId, portalUrl } from "../config";

import { expiration } from "./../utils/dateUtils";

const CSS = {
  base: "dropdown js-dropdown right",
  toggle:
    "top-nav-link js-dropdown-toggle user-icon padding-right-1 padding-left-1",
  link: "dropdown-link"
};

import { userMenu } from "./UserNav/components/UserMenu";

@subclass("app.widgets.UserNav")
class UserNav extends declared(Widget) {
  @property()
  auth = new Authenticate({
    appId,
    portalUrl,
    showLabel: true
  });

  @property({
    readOnly: true,
    dependsOn: ["auth.viewModel.credential"]
  })
  get sessionDuration(): string {
    if (this.auth && this.auth.viewModel.credential) {
      const { expires } = this.auth.viewModel.credential;
      return expiration(expires);
    }
    return "not available";
  }

  @aliasOf("auth.isSignedIn") signedIn: boolean;

  @renderable()
  @aliasOf("auth.viewModel.userName")
  userName: string;

  @property() view: MapView;

  constructor(params?: any) {
    super(params);
  }

  render() {
    return (
      <div class={CSS.base}>
        <a
          class={CSS.toggle}
          bind={this}
          afterCreate={this.handleMenuCreation}
          tabindex="0"
          aria-haspopup="true"
          aria-expanded="false"
          href="#"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            class="svg-icon user-icon"
          >
            <path d="M16.005 15.871a5.872 5.872 0 0 0 0-11.742 5.87 5.87 0 1 0 0 11.742zm11.567 7.188C27.27 19.036 20.023 18 16 18c-4.012 0-11.271 1.039-11.573 5.059C4.203 26.11 4.068 28.18 4.02 30h23.96c-.047-1.82-.184-3.891-.407-6.941z" />
          </svg>
          User
        </a>
        {userMenu(
          {
            userName: this.userName,
            sessionDuration: this.sessionDuration,
            menuItems: [
              <a href="#" class={CSS.link} role="menu-item">
                <div bind={this} afterCreate={this.handleAuthButton} />
              </a>
            ]
          },
          this
        )}
      </div>
    );
  }

  private handleMenuCreation() {
    dropdown();
  }

  private handleAuthButton(element: HTMLDivElement) {
    this.auth.container = element;
  }
}

export default UserNav;
