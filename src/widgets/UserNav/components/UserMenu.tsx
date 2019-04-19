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

import { tsx } from "esri/widgets/support/widget";

import i18n from "dojo/i18n!./../nls/UserMenu";

export const upper: (s: string) => string = s => s.toUpperCase();

export interface UserMenuProps {
  userName: string;
  sessionDuration: string;
  menuItems: JSX.IntrinsicElements[];
}

const CSS = {
  menu: "dropdown-menu dropdown-right",
  title: "dropdown-title",
  link: "dropdown-link"
};

/**
 * Returns the navigation menu item for a user to sign in or out
 * @param props
 * @param context
 */
export const userMenu = (props: UserMenuProps, context: any) => (
  <nav class={CSS.menu} role="menu">
    <span class={CSS.title}>
      {props.userName}
      <br />
      <small>
        {props.userName
          ? `${i18n.session} ${upper(props.sessionDuration)}`
          : i18n.signin}
      </small>
    </span>
    {props.menuItems}
  </nav>
);
