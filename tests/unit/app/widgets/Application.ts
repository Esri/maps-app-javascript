/// <amd-dependency path="esri/core/tsSupport/generatorHelper" name="__generator" />
/// <amd-dependency path="esri/core/tsSupport/awaiterHelper" name="__awaiter" />

import {} from "intern";
import td = require("testdouble");

import promiseUtils = require("esri/core/promiseUtils");

import app from "../../../../src/app/widgets/Application";

import MapView = require("esri/views/MapView");

const { suite, test, before, after } = intern.getInterface("tdd");

suite("app/widgets/Application", () => {
  const addToUI = td.function("addToUI");

  before(() => {});

  after(() => {});

  test("Store can load widgets when view is ready", async () => {
    const view = new MapView({
      container: document.createElement("div")
    });
    view.ui.add = addToUI as any;
    app.view = view;
    await app.loadWidgets();
    td.verify(addToUI(td.matchers.anything()));
  });
});
