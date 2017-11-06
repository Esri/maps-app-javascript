import {} from "intern";
import td = require("testdouble");

import promiseUtils = require("esri/core/promiseUtils");

import Directions from "../../../../app/widgets/Directions";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/widgets/Directions", () => {
  const directions = new Directions();

  test("will call route when search or location graphic defined", () => {
    const route = td.function("route");
    td
      .when(route(td.matchers.anything(), td.matchers.anything()))
      .thenReturn(promiseUtils.resolve({}));
    directions.search = {
      selectedResult: {}
    } as any;
    directions.locate = {
      graphic: {
        geometry: {}
      }
    } as any;
    directions.viewModel.route = route as any;
    directions.onClickHandler(new MouseEvent("click"));
    td.verify(
      route(directions.locate.graphic, directions.searchResult.feature)
    );
  });
});
