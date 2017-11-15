import {} from "intern";
import td = require("testdouble");

import promiseUtils = require("esri/core/promiseUtils");

import store from "../../../src/app/stores/app";

import init, { empty } from "../../../src/app/init";

const { suite, test, before, after } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/main", () => {
  const loadWidgets = td.function("loadWidgets");
  const originalLoad = store.loadWidgets;

  before(() => {
    const webmap = document.createElement("webmap");
    document.body.appendChild(webmap);
    td.when(loadWidgets()).thenResolve();
    store.loadWidgets = loadWidgets as any;
  });

  after(() => {
    store.loadWidgets = originalLoad;
  });

  test("empty method can empty a dom element", () => {
    const element = document.createElement("div");
    element.innerHTML = "<h2>Check me out!</h2>";
    empty(element);

    assert.equal(element.innerHTML, "");
  });

  test("main application can initialize widgets", () => {
    init();
    td.verify(loadWidgets());
  });

  test("store will create view when signed in", function() {
    store.signedIn = true;
    const dfd = this.async(600);
    init();
    setTimeout(
      dfd.callback(() => {
        assert.ok(store.view);
      }),
      500
    );
  });
});
