import Browser from "../../../../src/app/widgets/Browser";

import td = require("testdouble");

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/widgets/Browser", () => {
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
    const changeWebmap = td.function();
    const browser = new Browser({ items });
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
    td.verify(changeWebmap(items[1].id));
  });
});
