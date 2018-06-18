import { applyReverseGeocodeAction } from "../../../src/mapactions/reverseGeocode";

import Point from "esri/geometry/Point";
import MapView from "esri/views/MapView";
import Search from "esri/widgets/Search";

import sinon from "sinon";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("mapactions/reverseGeocode", () => {
  const EVENT = "hold";

  test("listens for MapView hold event", () => {
    const on = sinon.stub().returns({});
    const view = new MapView();
    const search = new Search({ view });
    (view as any).on = on;
    const action = applyReverseGeocodeAction(view, search);
    action.addListeners();

    assert.isTrue(on.calledWith(EVENT, sinon.match.any));
  });

  test("will use search function to reverse geocode", async () => {
    const searchMethod = sinon.stub();
    const view = new MapView();
    const search = new Search({ view });
    (search as any).search = searchMethod;
    const mapPoint = new Point({ x: 1, y: 1 });
    const action = applyReverseGeocodeAction(view, search);
    await action.reverseGeocode({ mapPoint });

    assert.isTrue(searchMethod.calledWith(mapPoint));
  });

  test("can subscribe to results", () => {
    const watchMethod = sinon.stub().returns({});
    const view = new MapView();
    const search = new Search({ view });
    const action = applyReverseGeocodeAction(view, search);
    const callback = () => "hello";
    (action as any).watch = watchMethod;
    action.subscribe(callback);

    assert.isTrue(watchMethod.calledWith("value", callback));
  });

  test("can unsubscribe from results", () => {
    const remove = { remove() {} };
    const view = new MapView();
    const search = new Search({ view });
    const action = applyReverseGeocodeAction(view, search);
    action.handlers.add({ remove } as any);
    action.unsubscribe();
    assert.isEmpty(action.handlers.toArray());
  });
});
