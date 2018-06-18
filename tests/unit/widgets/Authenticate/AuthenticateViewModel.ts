import Credential from "esri/identity/Credential";
import AuthenticateViewModel from "../../../../src/widgets/Authenticate/AuthenticateViewModel";

import sinon from "sinon";

const { beforeEach, suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("widgets/Authenticate/AuthenticateViewModel", () => {
  let authVM: AuthenticateViewModel;

  beforeEach(() => {
    authVM = new AuthenticateViewModel();
    authVM.appId = "1234";
    authVM.portalUrl = "BobsBurger";
  });

  test("will update OUAthInfo when appId assigned", async () => {
    await Promise.resolve();
    assert.isOk(authVM.info);
  });

  test("check authentication status", async () => {
    const credential = new Credential({
      expires: Date.now(),
      userId: "Sam"
    });
    const currentStatus = sinon.stub().resolves(credential);
    (authVM as any).currentStatus = currentStatus;
    const results = await authVM.checkStatus();

    assert.equal(results, credential);
    assert.isTrue(currentStatus.calledWith(authVM.info));
  });

  test("can sign in", async () => {
    const credential = new Credential({
      expires: Date.now(),
      userId: "Sam"
    });
    const currentStatus = sinon.stub().resolves(credential);
    (authVM as any).currentStatus = currentStatus;
    const results = await authVM.signIn();

    assert.equal(results, credential);
    assert.isTrue(currentStatus.calledWith(authVM.info));
  });

  test("can sign out", () => {
    const reload = sinon.stub();
    (authVM as any).pageReload = reload;
    authVM.signOut();
    assert.isNull(authVM.credential);
    assert.isTrue(reload.called);
  });
});
