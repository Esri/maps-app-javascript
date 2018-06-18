import {
  PortalItem,
  PortalItemProps
} from "../../../../../src/widgets/WebMapBrowser/components/PortalItem";

import sinon from "sinon";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("widgets/WebMapBrowser/components/PortalItem", () => {
  test("Can create a Portal Item card from Portal Item props given", () => {
    const props: PortalItemProps = {
      key: 42,
      thumbnailUrl: "https://www.fillmurray.com/140/200",
      title: "You're Awesome",
      id: "4815162342",
      created: new Date(),
      isActive: true,
      onClick: sinon.stub() as any
    };

    const vnode: JSX.IntrinsicElements = PortalItem(props, sinon);
    assert.equal(vnode.properties["data-id"], props.id);
    assert.lengthOf(vnode.children, 2);
    const img = vnode.children[0];
    assert.equal(img.properties.src, props.thumbnailUrl);
    assert.equal(img.properties.alt, props.title);
  });
});
