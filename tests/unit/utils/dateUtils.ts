import moment from "esri/moment";

import { expiration, now } from "../../../src/utils/dateUtils";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("utils/dateUtils", () => {
  test("expiration: Can return a proper expiration string as days", () => {
    const EXPECTED = "14 days";
    const startTime = now();
    const endTime = moment()
      .add(2, "weeks")
      .valueOf();
    const result = expiration(endTime, startTime);
    assert.equal(result, EXPECTED);
  });

  test("expiration: Can return a proper expiration string as hours", () => {
    const EXPECTED = "4.0 hours";
    const startTime = now();
    const endTime = moment()
      .add(4, "hours")
      .valueOf();
    const result = expiration(endTime, startTime);
    assert.equal(result, EXPECTED);
  });
});
