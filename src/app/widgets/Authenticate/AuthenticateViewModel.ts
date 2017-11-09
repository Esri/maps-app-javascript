/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Accessor = require("esri/core/Accessor");
import promiseUtils = require("esri/core/promiseUtils");
import watchUtils = require("esri/core/watchUtils");
import Credential = require("esri/identity/Credential");
import IdentityManager = require("esri/identity/IdentityManager");
import OAuthInfo = require("esri/identity/OAuthInfo");

import {
  aliasOf,
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

type Resolver = (value?: any) => void;
type Rejector = (error?: any) => void;

interface AuthenticateViewModel {
  credential: Credential | null;
  signin(): Promise<Credential>;
  signout(): void;
}

export interface AuthenticateParams {
  appId: string;
}

const { watch, whenOnce } = watchUtils;

@subclass()
class AuthenticateViewModel extends declared(Accessor) {
  @property() credential: Credential | null;

  @property() appId: string;

  @property() info: OAuthInfo;

  constructor(params?: AuthenticateParams) {
    super(params);
    const width = 800;
    const height = 480;

    const left = Number(screen.availWidth / 2 - width / 2);
    const top = Number(screen.availHeight / 2 - height / 2);
    const windowFeatures = `width=${width},height=${
      height
    },status,resizable,left=${left},top=${top},screenX=${left},screenY=${top}`;

    watch(this, "appId", appId => {
      this.info = new OAuthInfo({
        appId,
        popup: true,
        popupWindowFeatures: windowFeatures
      });
    });
  }

  checkStatus() {
    return new Promise(async (resolve, reject) => {
      if (!this.info) {
        const { value: info } = await whenOnce(this, "info");
        return this._checkStatus(resolve);
      }
      return this._checkStatus(resolve);
    });
  }

  signin() {
    return new Promise(async (resolve, reject) => {
      if (!this.info) {
        const { value: info } = await whenOnce(this, "info");
        return this._login(resolve, reject);
      }
      return this._login(resolve, reject);
    });
  }

  signout() {
    IdentityManager.destroyCredentials();
    this.credential = null;
    location.reload();
  }

  private async _checkStatus(resolve: Resolver) {
    this.registerOAuth();
    try {
      this.credential = await this.currentStatus(this.info);
      resolve(this.credential);
    } catch (error) {}
  }

  private async _login(resolve: Resolver, reject: Rejector) {
    this.registerOAuth();
    try {
      this.credential = await this.currentStatus(this.info);
      resolve(this.credential);
    } catch (error) {
      try {
        const credential = await this.fetchCredentials();
        resolve(credential);
      } catch (err) {
        reject(err);
      }
    }
  }

  private registerOAuth() {
    if ((window.navigator as any).standalone !== true) {
      IdentityManager.registerOAuthInfos([this.info]);
    } else {
      // TODO - add some logic to save creds to localStorage if app saved to homescreen
    }
  }

  private currentStatus(info: OAuthInfo) {
    return IdentityManager.checkSignInStatus(`${info.portalUrl}/sharing`);
  }

  private async fetchCredentials() {
    this.credential = await IdentityManager.getCredential(
      `${this.info.portalUrl}/sharing`,
      {
        error: null as any,
        oAuthPopupConfirmation: false,
        retry: false,
        token: null as any
      }
    );
    return this.credential;
  }
}

export default AuthenticateViewModel;
