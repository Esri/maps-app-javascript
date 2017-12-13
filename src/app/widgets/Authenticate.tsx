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

import Credential = require("esri/identity/Credential");
import Widget = require("esri/widgets/Widget");

import * as i18n from "dojo/i18n!./Authenticate/nls/Authenticate";
import AuthenticateViewModel from "./Authenticate/AuthenticateViewModel";

import { AuthStatus, SignIn, SignOut, User } from "./AuthComponents";

import esri = __esri;

interface AuthenticateProperties extends esri.WidgetProperties {
  appId?: string;
  showLabel?: boolean;
  viewModel?: AuthenticateViewModel;
}

const CSS = {
  base: "authenticate",
  icon: "authenticate-icon",
  margin: "authenticate-margin",
  label: "authenticate-label"
};

@subclass("app.widgets.Authenticate")
class Authenticate extends declared(Widget) {
  @property({
    type: AuthenticateViewModel
  })
  viewModel = new AuthenticateViewModel();

  @renderable()
  @property()
  showLabel = true;

  @aliasOf("viewModel.appId") appId: string;

  @aliasOf("viewModel.checkStatus") checkStatus: () => Promise<Credential>;

  @aliasOf("viewModel.signout") signout: () => void;

  @aliasOf("viewModel.signin") signin: () => Promise<void>;

  @aliasOf("viewModel.userName") userName: string;

  @property({
    readOnly: true,
    dependsOn: ["credential"]
  })
  private get isSignedIn(): boolean {
    return !!this.credential;
  }

  @renderable()
  @aliasOf("viewModel.credential")
  private credential: Credential;

  constructor(params?: AuthenticateProperties) {
    super(params);
  }

  render() {
    const icon = this.isSignedIn
      ? // Sign-in icon
        SignIn({ icon: CSS.icon })
      : // Sign-out icon
        SignOut({ icon: CSS.icon });

    // Determine what the displayed message will be.
    const text = this.isSignedIn ? i18n.signout : i18n.signin;

    // Properties for stateless component
    const props = {
      style: join(CSS.label, CSS.margin),
      showLabel: this.showLabel,
      text,
      icon
    };

    return (
      <div
        class={CSS.base}
        bind={this}
        onclick={this.onClick}
        afterCreate={this.handleAfterCreate}
      >
        {AuthStatus(props)}
        &nbsp;
        {User(this.userName)}
      </div>
    );
  }

  /**
   * Based on curernt signedIn status, either sign the user in or out.
   */
  private onClick() {
    this.isSignedIn ? this.signout() : this.signin();
  }

  /**
   * Once widget is created, check what the current sign in status is.
   * @param node
   */
  private handleAfterCreate(node: Element) {
    this.checkStatus();
  }
}

export = Authenticate;
