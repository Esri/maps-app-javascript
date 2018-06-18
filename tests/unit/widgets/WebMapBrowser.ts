import WebMapBrowser from "../../../src/widgets/WebMapBrowser";

import sinon from "sinon";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("widgets/WebMapBrowser", () => {
  test("when webmap selected, will ask view model to change it in view", () => {
    const items = [
      {
        id: "atom",
        isActive: false
      },
      {
        id: "heart",
        isActive: false
      },
      {
        id: "mother",
        isActive: false
      }
    ];
    const changeWebmap = sinon.stub();
    const browser = new WebMapBrowser({ items });
    (browser.viewModel as any).changeWebmap = changeWebmap;
    const mockEvent = {
      currentTarget: {
        dataset: {
          id: "heart"
        }
      }
    };
    browser.onItemClick(mockEvent as any);
    assert.isTrue(items[1].isActive);
    assert.isTrue(changeWebmap.calledWith(items[1].id));
  });
});
