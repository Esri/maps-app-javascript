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

const MAPS_APP_KEY = "esrijs-maps-app-credentials";

@subclass("app.widgets.Authenticate.AuthenticateViewModel")
class AuthenticateViewModel extends declared(Accessor) {
  @property() credential: Credential | null;

  @property() appId: string;

  @property() info: OAuthInfo;

  constructor(params?: AuthenticateParams) {
    super(params);

    watch(this, "appId", appId => {
      this.info = new OAuthInfo({
        appId,
        popup: true
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
    localStorage.removeItem(MAPS_APP_KEY);
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

  private checkForLocalCreds() {
    if ((window.navigator as any).standalone) {
      const credString = localStorage.getItem(MAPS_APP_KEY);
      if (credString) {
        this.credential = new Credential(JSON.parse(credString));
        IdentityManager.initialize(this.credential);
      }
    }
  }

  private saveLocalCreds() {
    if ((window.navigator as any).standalone) {
      localStorage.setItem(
        MAPS_APP_KEY,
        JSON.stringify(IdentityManager.toJSON())
      );
    }
  }

  private currentStatus(info: OAuthInfo) {
    return IdentityManager.checkSignInStatus(`${info.portalUrl}/sharing`);
  }

  private registerOAuth() {
    if ((window.navigator as any).standalone !== true) {
      IdentityManager.registerOAuthInfos([this.info]);
    } else {
      this.checkForLocalCreds();
    }
  }

  private async fetchCredentials() {
    if ((window.navigator as any).standalone !== true) {
      this.credential = await IdentityManager.getCredential(
        `${this.info.portalUrl}/sharing`,
        {
          error: null as any,
          oAuthPopupConfirmation: false,
          retry: false,
          token: null as any
        }
      );
    } else {
      this.credential = await IdentityManager.getCredential(
        `${this.info.portalUrl}/sharing`
      );
    }

    this.saveLocalCreds();
    return this.credential;
  }
}

export default AuthenticateViewModel;
