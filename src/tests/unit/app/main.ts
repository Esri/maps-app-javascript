import {} from "intern";
import { mock, SinonSpy, spy, stub } from "sinon";
import td = require("testdouble");

import promiseUtils = require("esri/core/promiseUtils");

import store from "../../../app/stores/app";

import start, { empty } from "../../../app/main";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/main", () => {
  test("empty method can empty a dom element", () => {
    const element = document.createElement("div");
    element.innerHTML = "<h2>Check me out!</h2>";
    empty(element);

    assert.equal(element.innerHTML, "");
  });

  test("main application can initialize widgets", () => {
    const stubLoad = stub(store, "loadWidgets").returns(promiseUtils.resolve());
    start();
    assert.ok(stubLoad.calledOnce);
  });
});
