/// <amd-dependency path="esri/core/tsSupport/generatorHelper" name="__generator" />
/// <amd-dependency path="esri/core/tsSupport/awaiterHelper" name="__awaiter" />

import {} from "intern";
import td = require("testdouble");

import promiseUtils = require("esri/core/promiseUtils");

import store from "../../../../src/app/stores/app";

import MapView = require("esri/views/MapView");

const { suite, test, before, after } = intern.getInterface("tdd");

suite("app/stores/app", () => {
  const addToUI = td.function("addToUI");

  before(() => {});

  after(() => {});

  test("Store can load widgets when view is ready", async () => {
    const view = new MapView({
      container: document.createElement("div")
    });
    view.ui.add = addToUI as any;
    store.view = view;
    await store.loadWidgets();
    td.verify(addToUI(td.matchers.anything()));
  });
});
