import {} from "intern";
import td = require("testdouble");

import promiseUtils = require("esri/core/promiseUtils");

import maquetteQuery = require("maquette-query/dist/test-projector");

import Directions from "../../../../app/widgets/Directions";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");
const { createTestProjector } = maquetteQuery;

suite("app/widgets/Directions", () => {
  const directions = new Directions();

  const projector = createTestProjector(directions.render() as any);

  test("can render component correctly", () => {
    const svg = projector.query("svg");
    assert.ok(svg);
  });

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
