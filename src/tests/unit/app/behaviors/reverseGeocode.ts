import {} from "intern";
import td = require("testdouble");

import Accessor = require("esri/core/Accessor");

import { applyBehavior } from "../../../../app/behaviors/reverseGeocode";

const { after, before, suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/behaviors/reverseGeocode", () => {
  let view: any;

  const onHold = td.function();

  const disable = td.function();

  before(() => {
    view = {
      on: onHold,
      spatialReference: { wkid: 4326 }
    };
    td
      .when(onHold("hold", td.matchers.anything()))
      .thenReturn({ remove: disable });
  });

  after(() => {
    // view.destroy();
  });

  test("reverseGeocode behavior will listen to View hold event", () => {
    const behavior = applyBehavior(view);
    td.verify(onHold("hold", td.matchers.anything()));
  });

  test("reverseGeocode behavior can be disabled", () => {
    const behavior = applyBehavior(view);
    behavior.disable();
    td.verify(disable());
  });
});
