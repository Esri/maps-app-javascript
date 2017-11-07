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

import { SignIn, SignOut } from "./AuthIcons";

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

    const text = this.isSignedIn ? i18n.signout : i18n.signin;

    const content = !this.showLabel ? (
      <span aria-label={text}>{icon}</span>
    ) : (
      <span>
        <span aria-label={text}>{icon}</span>
        <span class={join(CSS.label, CSS.margin)}>{text}</span>
      </span>
    );

    return (
      <div
        class={CSS.base}
        bind={this}
        onclick={this.onClick}
        afterCreate={this.handleAfterCreate}
      >
        {content}
      </div>
    );
  }

  private onClick() {
    this.isSignedIn ? this.signout() : this.signin();
  }

  private handleAfterCreate(node: Element) {
    this.checkStatus();
  }
}

export = Authenticate;
