import {} from "intern";
import td = require("testdouble");

import Accessor = require("esri/core/Accessor");

import promiseUtils = require("esri/core/promiseUtils");

import { applyBehavior } from "../../../../app/behaviors/reverseGeocode";

const { after, before, suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/behaviors/reverseGeocode", () => {
  let view: any;

  const onHold = td.function();

  const remove = td.function();

  const locationToAddress = td.function();

  let behavior: any;

  let originalAddressFunc: any;

  before(() => {
    view = {
      on: onHold,
      spatialReference: { wkid: 4326 }
    };
    td.when(onHold("hold", td.matchers.anything())).thenReturn({ remove });
    behavior = applyBehavior(view);
    originalAddressFunc = behavior.locator.locationToAddress;
  });

  after(() => {
    behavior.locator.locationToAddress = originalAddressFunc;
  });

  test("reverseGeocode behavior will listen to View hold event", function() {
    assert.equal(behavior.view, view);
    const dfd = this.async();
    setTimeout(
      dfd.callback(() => {
        td.verify(onHold("hold", td.matchers.anything()));
      }),
      500
    );
  });

  test("reverseGeocode will use locator to find address", () => {
    const data = { mapPoint: { x: 0, y: 0 } };
    td
      .when(locationToAddress(data.mapPoint, td.matchers.isA(Number)))
      .thenReturn(promiseUtils.resolve({ address: "Hello" }));
    behavior.locator.locationToAddress = locationToAddress;
    behavior.reverseGeocode(data);
    td.verify(locationToAddress(data.mapPoint, td.matchers.isA(Number)));
  });
});
