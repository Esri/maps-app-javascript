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
  credential: Credential;
  signin(): IPromise<Credential>;
  signout(): void;
}

export interface AuthenticateParams {
  appId: string;
}

const { watch, whenOnce } = watchUtils;

@subclass()
class AuthenticateViewModel extends declared(Accessor) {
  @property() credential: Credential;

  @property() appId: string;

  @property() info: OAuthInfo = null;

  constructor(params?: AuthenticateParams) {
    super(params);
    const width = 800;
    const height = 480;

    const left = Number(screen.availWidth / 2 - width / 2);
    const top = Number(screen.availHeight / 2 - height / 2);
    const windowFeatures = `width=${width},height=${height},status,resizable,left=${left},top=${top},screenX=${left},screenY=${top}`;

    watch(this, "appId", appId => {
      this.info = new OAuthInfo({
        appId,
        popup: true,
        popupWindowFeatures: windowFeatures
      });
    });
  }

  checkStatus() {
    return (promiseUtils as any).create(
      (resolve: Resolver, reject: Rejector) => {
        if (!this.info) {
          return whenOnce(this, "info", info => this._checkStatus(resolve));
        }
        return this._checkStatus(resolve);
      }
    );
  }

  signin() {
    return (promiseUtils as any).create(
      (resolve: Resolver, reject: Rejector) => {
        if (!this.info) {
          return whenOnce(this, "info", info => this._login(resolve, reject));
        }
        return this._login(resolve, reject);
      }
    );
  }

  signout() {
    IdentityManager.destroyCredentials();
    this.credential = null;
    location.reload();
  }

  private _checkStatus(resolve: Resolver) {
    if (
      "standalone" in window.navigator &&
      !(window.navigator as any).standalone
    ) {
      IdentityManager.registerOAuthInfos([this.info]);
    }
    IdentityManager.checkSignInStatus(
      `${this.info.portalUrl}/sharing`
    ).then(credential => {
      this.credential = credential;
      resolve(credential);
    });
  }

  private _login(resolve: Resolver, reject: Rejector) {
    if (
      "standalone" in window.navigator &&
      !(window.navigator as any).standalone
    ) {
      IdentityManager.registerOAuthInfos([this.info]);
    }
    IdentityManager.checkSignInStatus(`${this.info.portalUrl}/sharing`)
      .then(credential => {
        this.credential = credential;
        resolve(credential);
      })
      .otherwise(() => {
        this.fetchCredentials()
          .then(credential => {
            resolve(credential);
          })
          .otherwise(reject);
      });
  }

  private fetchCredentials() {
    return IdentityManager.getCredential(`${this.info.portalUrl}/sharing`, {
      error: null,
      oAuthPopupConfirmation: false,
      retry: false,
      token: null
    }).then(credential => (this.credential = credential));
  }
}

export default AuthenticateViewModel;
