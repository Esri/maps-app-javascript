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
import Widget from "esri/widgets/Widget";

import AuthenticateViewModel from "./Authenticate/AuthenticateViewModel";
import {
  AuthStatus,
  SignIn,
  SignOut
} from "./Authenticate/components/AuthComponents";

import i18n from "dojo/i18n!./Authenticate/nls/Authenticate";

import esri = __esri;

interface AuthenticateProperties extends esri.WidgetProperties {
  appId?: string;
  portalUrl?: string;
  showLabel?: boolean;
  viewModel?: AuthenticateViewModel;
}

const CSS = {
  base: "authenticate",
  margin: "margin-left-1"
};

@subclass("app.widgets.Authenticate")
class Authenticate extends declared(Widget) {
  @property({
    type: AuthenticateViewModel
  })
  viewModel = new AuthenticateViewModel();

  @renderable()
  @property()
  showIcon = false;

  @renderable()
  @property()
  showLabel = true;

  @aliasOf("viewModel.appId") appId: string;

  @aliasOf("viewModel.portalUrl") portalUrl: string;

  @property({
    readOnly: true,
    dependsOn: ["viewModel.credential"]
  })
  get isSignedIn(): boolean {
    return !!this.viewModel.credential;
  }

  constructor(params?: AuthenticateProperties) {
    super(params);
  }

  render() {
    const icon = this.isSignedIn
      ? // Sign-in icon
        SignIn()
      : // Sign-out icon
        SignOut();

    // Determine what the displayed message will be.
    const text = this.isSignedIn ? i18n.signout : i18n.signin;

    // Properties for stateless component
    const props = {
      style: CSS.margin,
      showIcon: this.showIcon,
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
      </div>
    );
  }

  /**
   * Based on curernt signedIn status, either sign the user in or out.
   */
  private onClick() {
    this.isSignedIn ? this.viewModel.signOut() : this.viewModel.signIn();
  }

  /**
   * Once widget is created, check what the current sign in status is.
   */
  private handleAfterCreate() {
    this.viewModel.checkStatus();
  }
}

export default Authenticate;
