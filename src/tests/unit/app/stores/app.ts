import {} from "intern";
import td = require("testdouble");

import promiseUtils = require("esri/core/promiseUtils");

import store from "../../../../app/stores/app";

import MapView = require("esri/views/MapView");

const { suite, test, before, after } = intern.getInterface("tdd");

suite("app/stores/app", async () => {
  const addToUI = td.function("addToUI");
  const originalAdd = store.addToUI;

  before(() => {
    store.addToUI = addToUI as any;
  });

  after(() => {
    store.addToUI = originalAdd;
  });

  test("Store can load widgets when view is ready", function() {
    const view = new MapView({
      container: document.createElement("div")
    });
    const dfd = this.async(5000);
    store.loadWidgets().then(
      dfd.callback(() => {
        td.verify(addToUI(td.matchers.anything()));
      })
    );
    store.view = view;
  });
});
