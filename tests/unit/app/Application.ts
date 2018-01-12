/// <amd-dependency path="esri/core/tsSupport/generatorHelper" name="__generator" />
/// <amd-dependency path="esri/core/tsSupport/awaiterHelper" name="__awaiter" />

import app, { empty } from "../../../src/app/Application";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/Application", () => {
  test("Application will create MapView", async () => {
    await app.loadWidgets();
    assert.ok(app.view);
  });

  test("Can empty DOM element when needed", () => {
    const div = document.createElement("div");
    div.innerHTML = "I am a DOM element";
    empty(div);
    assert.isEmpty(div.innerHTML);
  });
});
