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
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import { renderable, tsx } from "esri/widgets/support/widget";

import Widget from "esri/widgets/Widget";

import esri = __esri;

export type COLOR = "red" | "yellow" | "green" | "default";

export interface AlertProps extends esri.WidgetProperties {
  message?: string;
  isActive?: boolean;
  isFull?: boolean;
  color?: COLOR;
}

const CSS = {
  base: "alert modifier-class fade-in",
  close: "alert-close",
  active: "is-active",
  red: "alert-red",
  yellow: "alert-yellow",
  green: "alert-green",
  full: "alert-full",
  icon: "svg-icon"
};

@subclass("app.widgets.Alert")
class Alert extends declared(Widget) {
  @property()
  @renderable()
  message = "";

  @property()
  @renderable()
  isActive = false;

  @property()
  @renderable()
  isFull = false;

  @property()
  @renderable()
  color: COLOR = "default";

  constructor(params?: AlertProps) {
    super(params);
  }

  render() {
    const dynamicClasses = {
      [CSS.active]: this.isActive,
      [CSS.full]: this.isFull,
      [CSS.red]: this.color === "red",
      [CSS.green]: this.color === "green",
      [CSS.yellow]: this.color === "yellow"
    };

    return (
      <div classes={dynamicClasses} class={CSS.base}>
        {this.message}
        <a href="#" bind={this} onclick={this.close} class={CSS.close}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            class={CSS.icon}
          >
            <path d="M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z" />
          </svg>
        </a>
      </div>
    );
  }

  close(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    this.isActive = false;
  }

  open() {
    this.isActive = true;
  }

  toggle() {
    this.isActive = !this.isActive;
  }
}

export default Alert;
