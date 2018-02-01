/// <amd-dependency path="esri/core/tsSupport/generatorHelper" name="__generator" />
/// <amd-dependency path="esri/core/tsSupport/awaiterHelper" name="__awaiter" />

import MapView = require("esri/views/MapView");

import WebMapBrowserViewModel from "../../../../../src/app/widgets/WebMapBrowser/WebMapBrowserViewModel";

import td = require("testdouble");

const { beforeEach, suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/widgets/WebMapBrowser/WebMapBrowserViewModel", () => {
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
    const load = td.function();
    td.when(load()).thenResolve({});
    const queryItems = td.function();
    td.when(queryItems(td.matchers.anything())).thenResolve({ results: ids });

    (vm.portal as any).load = load;
    (vm.portal as any).queryItems = queryItems;

    await vm.fetchItems();
    td.verify(load());
    td.verify(queryItems(td.matchers.anything()));
    assert.lengthOf(vm.webmaps, 3);
  });

  test("view model can change webmaps of view", async () => {
    const when = td.function();
    td.when(when()).thenResolve(true);
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
    const load = td.function();
    vm.webmaps.forEach(w => ((w as any).load = load));
    const result1 = await vm.changeWebmap("mother");
    td.verify(load());
    assert.isNotTrue(result1);
    const result2 = await vm.changeWebmap("atom");
    td.verify(when());
    assert.isTrue(result2);
  });
});
