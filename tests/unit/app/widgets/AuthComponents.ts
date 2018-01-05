import {} from "intern";
import td = require("testdouble");

import {
  AuthStatus,
  SignIn,
  SignOut,
  User
} from "../../../../src/app/widgets/AuthComponents";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/widgets/AuthComponents", () => {
  const icon1 = "icon-1";
  const icon2 = "icon-2";

  test("Icons can be initialized with properties", () => {
    const vnode1 = SignIn({ icon: icon1 });
    const vnode2 = SignOut({ icon: icon2 });
    assert.equal((vnode1 as any).properties.class, icon1);
    assert.equal((vnode2 as any).properties.class, icon2);
  });

  test("User contains empty name", () => {
    const vnode = User();
    assert.equal((vnode as any).children[0].text, "");
  });

  test("User contains given name", () => {
    const name = "Syd";
    const vnode: JSX.IntrinsicElements = User(name);
    assert.equal(vnode.children[0].text, `(${name})`);
  });

  test("AuthStatus contains a single element", () => {
    const props = {
      icon: SignIn({ icon: icon1 }),
      text: "Hello",
      showLabel: false,
      showIcon: false,
      style: "test-class"
    };
    const vnode: JSX.IntrinsicElements = AuthStatus(props);
    const child = vnode.children[0];
    assert.ok(child);
  });
});
