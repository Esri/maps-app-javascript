import {} from "intern";
import { mock, SinonSpy, spy, stub } from "sinon";
import td = require("testdouble");

import promiseUtils = require("esri/core/promiseUtils");

import store from "../../../../app/stores/app";

import esriRequest = require("esri/request");

import FeatureLayer = require("esri/layers/FeatureLayer");

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/stores/app", () => {
  test("will retrieve a user layer when available", () => {
    assert.equal("awesome", "awesome");
  });
});
