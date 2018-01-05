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
  signIn(): Promise<Credential>;
  signOut(): void;
}

export interface AuthenticateParams {
  appId: string;
}

const { watch, whenOnce } = watchUtils;

@subclass("app.widgets.Authenticate.AuthenticateViewModel")
class AuthenticateViewModel extends declared(Accessor) {
  /**
   * Current credential for application.
   */
  @property() credential: Credential | null;

  /**
   * Registered application ID to use for
   * OAuth authentication.
   */
  @property() appId: string;

  /**
   * OAuthInfo using `appId`.
   */
  @property() info: OAuthInfo;

  /**
   * Currently logged in user name.
   */
  @aliasOf("credential.userId") userName: string;

  constructor(params?: AuthenticateParams) {
    super(params);

    // Once an `appId` is provided, we can create our OAuthInfo.
    watch(this, "appId", appId => {
      this.info = new OAuthInfo({
        appId,
        popup: true
      });
    });
  }

  /**
   * Check the current status of whether a user is signed in or not.
   */
  checkStatus() {
    return new Promise(async (resolve, reject) => {
      if (!this.info) {
        const { value: info } = await whenOnce(this, "info");
        return this._checkStatus(resolve);
      }
      return this._checkStatus(resolve);
    });
  }

  /**
   * Check if there is a current OAuthInfo and take
   * user through the steps of signing in.
   */
  signIn() {
    return new Promise(async (resolve, reject) => {
      if (!this.info) {
        const { value: info } = await whenOnce(this, "info");
        return this._login(resolve, reject);
      }
      return this._login(resolve, reject);
    });
  }

  /**
   * Destroy credentials and reload application.
   */
  signOut() {
    IdentityManager.destroyCredentials();
    this.credential = null;
    location.reload();
  }

  /**
   * Check the current signed in status and attempt to
   * acquire current Credential.
   * @param resolve
   */
  private async _checkStatus(resolve: Resolver) {
    this.registerOAuth();
    try {
      this.credential = await this.currentStatus(this.info);
      resolve(this.credential);
    } catch (error) {}
  }

  /**
   * Check for a current credential for a user, if not already
   * signed in, go through steps to let user authenticate.
   * @param resolve
   * @param reject
   */
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

  /**
   * Use `IdentityManager` to check users current signed in status.
   * @param info
   */
  private currentStatus(info: OAuthInfo) {
    return IdentityManager.checkSignInStatus(`${info.portalUrl}/sharing`);
  }

  /**
   * Use `IdentityManager` to register current OAuthInfos.
   */
  private registerOAuth() {
    /**
     * When installed as a homescreen application, display-mode is standalone
     * OAuth redirects don't behave correctly here, so will not register
     * OAuth with the IdentityManager and use the old-school modal popup
     * in this case.
     */
    if (!window.matchMedia("(display-mode: standalone)").matches) {
      IdentityManager.registerOAuthInfos([this.info]);
    }
  }

  /**
   * OAuth login process for user.
   */
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
