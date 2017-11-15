import {} from "intern";
import td = require("testdouble");

import { SignIn, SignOut } from "../../../../src/app/widgets/AuthIcons";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/widgets/AuthIcons", () => {
  const icon1 = "icon-1";
  const icon2 = "icon-2";

  test("Icons can be initialized with properties", () => {
    const vnode1 = SignIn({ icon: icon1 });
    const vnode2 = SignOut({ icon: icon2 });
    assert.equal((vnode1 as any).properties.class, icon1);
    assert.equal((vnode2 as any).properties.class, icon2);
  });
});
