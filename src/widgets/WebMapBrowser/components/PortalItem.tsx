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

import { asMonthDayYear } from "../../../utils/dateUtils";

export interface PortalItemProps {
  key: number;
  thumbnailUrl: string;
  title: string;
  id: string;
  created: Date;
  isActive: boolean;
  onClick: (e: MouseEvent) => void;
}

const CSS = {
  item: "browser__item",
  active: "browser__item__active",
  thumbnail: "browser__item-thumbnail",
  description: "browser__item-description",
  title: "browser__item-title"
};

/**
 * These are simple stateless components used
 * with the Browser Widget.
 */
export const PortalItem = (props: PortalItemProps, context: any) => {
  const dynamicStyles = {
    [CSS.active]: props.isActive
  };
  return (
    <li
      bind={context}
      onclick={props.onClick}
      key={props.key}
      data-id={props.id}
      role="menuitem"
      tabindex="0"
      classes={dynamicStyles}
      class={CSS.item}
    >
      <img class={CSS.thumbnail} src={props.thumbnailUrl} alt={props.title} />
      <div class={CSS.description}>
        <span class={CSS.title}>{props.title}</span>
        <br />
        <span>{asMonthDayYear(props.created)}</span>
      </div>
    </li>
  );
};
