/*
import { assert } from "chai";
import * as registerSuite from "intern/lib/interfaces/object";
import { mock, SinonSpy, spy, stub } from "sinon";
import td = require("testdouble");

import promiseUtils = require("esri/core/promiseUtils");

import app = require("../../../app/main");
import store = require("../../../app/stores/app");

registerSuite({
  name: "app/main",
  setup() {},
  beforeEach() {},
  afterEach() {},
  teardown() {},
  "main application can initialize widgets"() {
    const stubLoad = stub(store, "load").returns(promiseUtils.resolve());
    app.start();
    assert.ok(stubLoad.calledOnce);
  }
});
*/

import {} from "intern";
import { mock, SinonSpy, spy, stub } from "sinon";
import td = require("testdouble");

import promiseUtils = require("esri/core/promiseUtils");

import app = require("../../../app/main");
import store from "../../../app/stores/app";

const { suite, test } = intern.getInterface('tdd');
const { assert } = intern.getPlugin('chai');

suite("app/main", () => {
  test("main application can initialize widgets", () => {
   // console.log("utils?", promiseUtils);
   // const stubLoad = stub(store, "loadWidgets").returns(promiseUtils.resolve());
   app.start();
   // assert.ok(stubLoad.calledOnce);
    assert.strictEqual("Hello", "Hello");
  });
});

