import { applyNavRotationAction } from "../../../src/mapactions/navRotation";

import MapView from "esri/views/MapView";
import Compass from "esri/widgets/Compass";

import sinon from "sinon";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("mapactions/navRotation", () => {
  const PROP = "rotation";

  test("view will watch for rotation change", () => {
    const watch = sinon.stub().returns({});
    const view = new MapView();
    const compass = new Compass({ view });
    (view as any).watch = watch;
    const action = applyNavRotationAction(view, compass);
    action.addListeners();

    assert.isTrue(watch.calledWithMatch(PROP));
  });

  test("can add/remove compass when rotation changes", () => {
    const remove = sinon.stub();
    const add = sinon.stub();
    const view = new MapView();
    const compass = new Compass({ view });

    const action = applyNavRotationAction(view, compass);
    (action.view.ui as any).remove = remove;
    (action.view.ui as any).add = add;

    action.handleRotation(2);
    assert.isTrue(add.calledWith(sinon.match.any, sinon.match.string));

    action.handleRotation(0);
    assert.isTrue(remove.called);
  });
});
