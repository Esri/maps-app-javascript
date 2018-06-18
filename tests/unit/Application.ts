import app, { collapseAll, empty, locateOnStart } from "../../src/Application";

import Collection from "esri/core/Collection";
import MapView from "esri/views/MapView";
import Expand from "esri/widgets/Expand";
import Locate from "esri/widgets/Locate";

import sinon from "sinon";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("Application", () => {
  test("Application will create MapView", () => {
    app.init();
    assert.ok(app.view);
  });

  test("Can empty DOM element when needed", () => {
    const div = document.createElement("div");
    div.innerHTML = "I am a DOM element";
    empty(div);
    assert.isEmpty(div.innerHTML);
  });

  test("can locate on start of application", async () => {
    const when = sinon.stub().resolves({});
    const locateFunc = sinon.stub().resolves({});
    const goTo = sinon.stub().resolves({});

    const container = document.createElement("div");
    const view = new MapView({ container });

    (view as any).when = when;
    (view as any).goTo = goTo;
    const location = new Locate();
    location.graphic = {
      attributes: {},
      geometry: {}
    } as any;
    (location as any).locate = locateFunc;
    await locateOnStart(view, location);

    assert.isTrue(goTo.called);
    assert.isTrue(location.goToLocationEnabled);
  });

  test("can collapse list of widgets", () => {
    const collection = new Collection();
    const exp1 = new Expand();
    const exp2 = new Expand();
    exp1.expand();
    exp2.expand();
    collection.addMany([exp1, exp2]);
    const collapser = collapseAll(collection);
    assert.isTrue(exp1.expanded);
    assert.isTrue(exp2.expanded);
    collapser();
    assert.isFalse(exp1.expanded);
    assert.isFalse(exp2.expanded);
  });
});
