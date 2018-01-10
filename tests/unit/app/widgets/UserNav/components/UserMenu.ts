import {
  upper,
  userMenu,
  UserMenuProps
} from "../../../../../../src/app/widgets/UserNav/components/UserMenu";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/widgets/UserNav/components/UserMenu", () => {
  test("Props can be applied to vnodes", () => {
    const props: UserMenuProps = {
      userName: "Sam",
      sessionDuration: "14 days",
      menuItems: []
    };
    const vnode: JSX.IntrinsicElements = userMenu(props, this);
    const children: any[] = vnode.children[0].children;
    const elem1 = children.find(a => a.vnodeSelector === "");
    assert.strictEqual(elem1.text, props.userName);

    const small: any = children.find((a: any) => a.vnodeSelector === "small");
    const elem2 = small.children.find((a: any) => a.vnodeSelector === "");
    assert.strictEqual(elem2.text, `Session expires in ${upper(props.sessionDuration)}`);
  });
});
