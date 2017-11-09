/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import {
  aliasOf,
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import { join, renderable, tsx } from "esri/widgets/support/widget";

import DirectionsViewModel from "./Directions/DirectionsViewModel";

import View = require("esri/views/View");
import Widget = require("esri/widgets/Widget");

import Locate = require("esri/widgets/Locate");
import Search = require("esri/widgets/Search");

import esri = __esri;

export interface DirectionsProperties extends esri.WidgetProperties {
  search?: Search;
  view?: esri.View;
  viewModel?: DirectionsViewModel;
}

const CSS = {
  base: "directions",
  icon: "svg-icon"
};

@subclass()
class Directions extends declared(Widget) {
  @property({
    type: DirectionsViewModel
  })
  viewModel = new DirectionsViewModel();

  @aliasOf("viewModel.view") view: View;

  @property() locate: Locate;

  @property() search: Search;

  @renderable()
  @property()
  working = false;

  @aliasOf("search.selectedResult") searchResult: any;

  constructor(params?: DirectionsProperties) {
    super(params);
  }

  render() {
    const classes = {
      spinner: this.working,
      [CSS.icon]: !this.working
    };
    const content = this.working ? (
      <svg
        classes={classes}
        width="20px"
        height="20px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="path"
          fill="none"
          stroke-width="10"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    ) : (
      <svg
        classes={classes}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path d="M28 12l-8-8v6h-8c-3.3 0-6 2.7-6 6v12h4V16c0-1.084.916-2 2-2h8v6l8-8z" />
      </svg>
    );
    return (
      <div class={CSS.base}>
        <div bind={this} title="Directions" onclick={this.onClickHandler}>
          {content}
        </div>
        <div bind={this} title="Clear" onclick={this.clear}>
          <svg
            class={CSS.icon}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <path d="M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z" />
          </svg>
        </div>
      </div>
    );
  }

  clear() {
    this.viewModel.clear();
    this.search.clear();
    this.view.graphics.removeAll();
  }

  async onClickHandler(event: MouseEvent) {
    if (this.searchResult && this.locate.graphic.geometry) {
      this.working = true;
      try {
        const data = await this.viewModel.route(
          this.locate.graphic,
          this.searchResult.feature
        );
        this.working = false;
      } catch (error) {
        console.warn(error); // tslint:disable-line: no-console
      }
    }
  }
}

export default Directions;
