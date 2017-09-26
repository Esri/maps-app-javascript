import { assert } from "chai";
import * as registerSuite from "intern/lib/interfaces/object";
import { mock, SinonSpy, spy, stub } from "sinon";

import promiseUtils = require("esri/core/promiseUtils");

import store from "../../../../app/stores/app";

import esriRequest = require("esri/request");

import FeatureLayer = require("esri/layers/FeatureLayer");

registerSuite({
  name: "app/stores/app",
  setup() {},
  beforeEach() {
  },
  afterEach() {},
  teardown() {},

  "will retrieve a user layer when available": () => {
    assert.equal("awesome", "awesome");
  }
});
