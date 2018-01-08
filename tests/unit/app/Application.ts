/// <amd-dependency path="esri/core/tsSupport/generatorHelper" name="__generator" />
/// <amd-dependency path="esri/core/tsSupport/awaiterHelper" name="__awaiter" />

// import {} from "intern";

import app from "../../../src/app/Application";

import MapView = require("esri/views/MapView");

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/Application", () => {
  test("Application will create MapView when signed in", async () => {
    app.signedIn = true;
    await app.loadWidgets();
    assert.ok(app.view);
  });
});
