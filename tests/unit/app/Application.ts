/// <amd-dependency path="esri/core/tsSupport/generatorHelper" name="__generator" />
/// <amd-dependency path="esri/core/tsSupport/awaiterHelper" name="__awaiter" />

import app, { empty, locateOnStart } from "../../../src/app/Application";

import MapView = require("esri/views/MapView");
import Locate = require("esri/widgets/Locate");
import td = require("testdouble");

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/Application", () => {
  test("Application will create MapView", () => {
    app.init();
    assert.ok(app.view);
  });

  test("Can empty DOM element when needed", () => {
    const div = document.createElement("div");
    div.innerHTML = "I am a DOM element";
    empty(div);
    assert.isEmpty(div.innerHTML);
  });

  test("can locate on start of application", async () => {
    const when = td.function();
    const locateFunc = td.function();
    const goTo = td.function();

    const container = document.createElement("div");
    const view = new MapView({ container });

    td.when(when()).thenResolve({});
    td.when(goTo(td.matchers.anything())).thenResolve({});
    td.when(locateFunc()).thenResolve({});

    (view as any).when = when;
    (view as any).goTo = goTo;
    const location = new Locate();
    location.graphic = {
      attributes: {},
      geometry: {}
    } as any;
    (location as any).locate = locateFunc;
    await locateOnStart(view, location);

    td.verify(goTo(td.matchers.anything()));
    assert.isTrue(location.goToLocationEnabled);
  });
});
