/// <amd-dependency path="esri/core/tsSupport/generatorHelper" name="__generator" />
/// <amd-dependency path="esri/core/tsSupport/awaiterHelper" name="__awaiter" />

import { applyReverseGeocodeAction } from "../../../../src/app/mapactions/reverseGeocode";

import td = require("testdouble");

import Point = require("esri/geometry/Point");
import MapView = require("esri/views/MapView");
import Search = require("esri/widgets/Search");

const { beforeEach, suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/mapactions/reverseGeocode", () => {
  const EVENT = "hold";

  test("listens for MapView hold event", () => {
    const on = td.function();
    const view = new MapView();
    const search = new Search({ view });
    (view as any).on = on;
    td.when(view.on(EVENT, td.matchers.anything())).thenReturn({});
    const action = applyReverseGeocodeAction(view, search);
    action.addListeners();
    td.verify(view.on(EVENT, td.matchers.anything()));
  });

  test("will use search function to reverse geocode", async () => {
    const searchMethod = td.function();
    const view = new MapView();
    const search = new Search({ view });
    (search as any).search = searchMethod;
    const mapPoint = new Point({ x: 1, y: 1 });
    const action = applyReverseGeocodeAction(view, search);
    await action.reverseGeocode({ mapPoint });
    td.verify(search.search(mapPoint));
  });

  test("can subscribe to results", () => {
    const watchMethod = td.function();
    const view = new MapView();
    const search = new Search({ view });
    const action = applyReverseGeocodeAction(view, search);
    const callback = () => "hello";
    (action as any).watch = watchMethod;
    td.when(action.watch("value", callback)).thenReturn({});
    action.subscribe(callback);
    td.verify(action.watch("value", callback));
  });

  test("can unsubscribe from results", () => {
    const remove = { remove() {} };
    const view = new MapView();
    const search = new Search({ view });
    const action = applyReverseGeocodeAction(view, search);
    action.handlers.add({ remove } as any);
    action.unsubscribe();
    assert.isEmpty(action.handlers.toArray());
  });
});
