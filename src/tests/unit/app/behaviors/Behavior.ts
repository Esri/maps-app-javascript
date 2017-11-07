import {} from "intern";
import td = require("testdouble");

import Behavior from "../../../../app/behaviors/Behavior";

const { after, before, suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/behaviors/Behavior", () => {
  class TestBehavior extends Behavior<string> {}

  let behavior: TestBehavior;

  before(() => {
    behavior = new TestBehavior();
  });

  after(() => {});

  test("Behavior will subscribe to value changes", function() {
    const dfd = this.async();
    const sub = td.function(td.matchers.isA(String));
    behavior.subscribe(sub);
    behavior.value = "Test";
    setTimeout(
      dfd.callback(() => {
        td.verify(sub("Test", undefined, "value", behavior));
      }),
      500
    );
    assert.lengthOf(behavior.handlers, 1);
  });

  test("Behavior allows for unsubscibing", () => {
    behavior.unsubscribe();
    assert.lengthOf(behavior.handlers, 0);
  });
});
