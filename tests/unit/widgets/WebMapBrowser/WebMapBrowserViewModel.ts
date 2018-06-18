import MapView from "esri/views/MapView";

import WebMapBrowserViewModel from "../../../../src/widgets/WebMapBrowser/WebMapBrowserViewModel";

import sinon from "sinon";

const { beforeEach, suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("widgets/WebMapBrowser/WebMapBrowserViewModel", () => {
  let vm: WebMapBrowserViewModel;

  beforeEach(() => {
    vm = new WebMapBrowserViewModel({
      view: new MapView()
    } as any);
    vm.portal.user = {
      username: "Pete Namlook"
    } as any;
  });

  test("Portal will attempt to load and fetch webmaps", async () => {
    const ids = [
      {
        id: "atom"
      },
      {
        id: "heart"
      },
      {
        id: "mother"
      }
    ];
    const load = sinon.stub().resolves({});
    const queryItems = sinon.stub().resolves({ results: ids });

    (vm.portal as any).load = load;
    (vm.portal as any).queryItems = queryItems;

    await vm.fetchItems();
    assert.isTrue(load.called);
    assert.isTrue(queryItems.called);
    assert.lengthOf(vm.webmaps, 3);
  });

  test("view model can change webmaps of view", async () => {
    const when = sinon.stub().resolves(true);
    const ids = [
      {
        portalItem: {
          id: "atom"
        },
        resourceInfo: {
          version: "2.8"
        },
        when
      },
      {
        portalItem: {
          id: "heart"
        },
        resourceInfo: {
          version: "2.8"
        },
        when
      },
      {
        portalItem: {
          id: "mother"
        },
        resourceInfo: {
          version: "1.2"
        },
        when
      }
    ];
    vm.webmaps.addMany(ids as any);
    const load = sinon.stub();
    vm.webmaps.forEach(w => ((w as any).load = load));
    const result1 = await vm.changeWebmap("mother");

    assert.isTrue(load.called);
    assert.isNotTrue(result1);
    const result2 = await vm.changeWebmap("atom");

    assert.isTrue(when.called);
    assert.isTrue(result2);
  });
});
