import Alert from "../../../src/widgets/Alert";

const { beforeEach, suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("widgets/Alert", () => {
  const MESSAGE = "Can you hear me now?";
  let alertWidget: Alert;

  beforeEach(() => {
    alertWidget = new Alert({
      message: MESSAGE
    });
  });

  test("Alert can have a message assigned", () => {
    assert.strictEqual(alertWidget.message, MESSAGE);
  });

  test("Alert can be opened", () => {
    alertWidget.open();
    assert.isTrue(alertWidget.isActive);
  });

  test("Alert can be closed", () => {
    alertWidget.close();
    assert.isFalse(alertWidget.isActive);
  });

  test("Alert can be toggled", () => {
    alertWidget.close();
    alertWidget.toggle();
    assert.isTrue(alertWidget.isActive);
    alertWidget.toggle();
    assert.isFalse(alertWidget.isActive);
  });
});
