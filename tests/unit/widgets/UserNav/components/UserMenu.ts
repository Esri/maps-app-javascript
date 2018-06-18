import {
  upper,
  userMenu,
  UserMenuProps
} from "../../../../../src/widgets/UserNav/components/UserMenu";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("widgets/UserNav/components/UserMenu", () => {
  test("Props can be applied to vnodes", () => {
    const props: UserMenuProps = {
      userName: "Sam",
      sessionDuration: "14 days",
      menuItems: []
    };
    const vnode: JSX.IntrinsicElements = userMenu(props, this);
    const children: JSX.IntrinsicElements[] = vnode.children[0].children;
    const elem1 = children.find(
      a => a.vnodeSelector === ""
    ) as JSX.IntrinsicElements;
    assert.strictEqual(elem1.text, props.userName);

    const small = children.find(
      a => a.vnodeSelector === "small"
    ) as JSX.IntrinsicElements;
    assert.strictEqual(
      small.text,
      `Session expires in ${upper(props.sessionDuration)}`
    );
  });
});
