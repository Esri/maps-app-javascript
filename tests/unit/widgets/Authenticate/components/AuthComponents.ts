import {
  AuthStatus,
  SignIn,
  SignOut,
  User
} from "../../../../../src/widgets/Authenticate/components/AuthComponents";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("widgets/Authenticate/components/AuthComponents", () => {
  test("Icons can be initialized with properties", () => {
    const vnode1 = SignIn();
    const vnode2 = SignOut();
    assert.equal((vnode1 as any).properties.class, "svg-icon");
    assert.equal((vnode2 as any).properties.class, "svg-icon");
  });

  test("User contains empty name", () => {
    const vnode: JSX.IntrinsicElements = User();
    assert.equal(vnode.text, "");
  });

  test("User contains given name", () => {
    const name = "Syd";
    const vnode: JSX.IntrinsicElements = User(name);
    assert.equal(vnode.text, `(${name})`);
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
