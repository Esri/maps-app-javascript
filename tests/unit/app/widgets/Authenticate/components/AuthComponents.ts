import {} from "intern";

import {
  AuthStatus,
  SignIn,
  SignOut,
  User
} from "../../../../../../src/app/widgets/Authenticate/components/AuthComponents";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/widgets/Authenticate/components/AuthComponents", () => {
  const icon1 = "icon-1";
  const icon2 = "icon-2";

  test("Icons can be initialized with properties", () => {
    const vnode1 = SignIn();
    const vnode2 = SignOut();
    assert.equal((vnode1 as any).properties.class, "svg-icon");
    assert.equal((vnode2 as any).properties.class, "svg-icon");
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
      icon: SignIn(),
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
