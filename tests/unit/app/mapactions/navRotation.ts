/// <amd-dependency path="esri/core/tsSupport/generatorHelper" name="__generator" />
/// <amd-dependency path="esri/core/tsSupport/awaiterHelper" name="__awaiter" />

import { applyNavRotationAction } from "../../../../src/app/mapactions/navRotation";

import td = require("testdouble");

import Point = require("esri/geometry/Point");
import MapView = require("esri/views/MapView");
import Compass = require("esri/widgets/Compass");

const { beforeEach, suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/mapactions/navRotation", () => {
  const PROP = "rotation";

  test("view will watch for rotation change", () => {
    const watch = td.function();
    const view = new MapView();
    const compass = new Compass({ view });
    (view as any).watch = watch;
    td.when(view.watch(PROP, td.matchers.anything())).thenReturn({});
    const action = applyNavRotationAction(view, compass);
    action.addListeners();
    td.verify(view.watch(PROP, td.matchers.anything()));
  });

  test("can add/remove compass when rotation changes", () => {
    const remove = td.function();
    const add = td.function();
    const view = new MapView();
    const compass = new Compass({ view });

    const action = applyNavRotationAction(view, compass);
    (action.view.ui as any).remove = remove;
    (action.view.ui as any).add = add;

    action.handleRotation(2);
    td.verify(add(td.matchers.anything(), td.matchers.isA(String)));

    action.handleRotation(0);
    td.verify(remove(td.matchers.anything()));
  });
});
