/// <amd-dependency path="esri/core/tsSupport/generatorHelper" name="__generator" />
/// <amd-dependency path="esri/core/tsSupport/awaiterHelper" name="__awaiter" />

import Credential = require("esri/identity/Credential");
import AuthenticateViewModel from "../../../../../src/app/widgets/Authenticate/AuthenticateViewModel";

import td = require("testdouble");

const { beforeEach, suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("app/widgets/Authenticate/AuthenticateViewModel", () => {
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
    const currentStatus = td.function();
    const credential = new Credential({
      expires: Date.now(),
      userId: "Sam"
    });
    (authVM as any).currentStatus = currentStatus;
    td.when(currentStatus(authVM.info)).thenResolve(credential);
    const results = await authVM.checkStatus();
    assert.equal(results, credential);
  });

  test("can sign in", async () => {
    const currentStatus = td.function();
    const credential = new Credential({
      expires: Date.now(),
      userId: "Sam"
    });
    (authVM as any).currentStatus = currentStatus;
    td.when(currentStatus(authVM.info)).thenResolve(credential);
    const result = await authVM.signIn();
    assert.isOk(result);
  });

  test("can sign out", () => {
    const reload = td.function();
    (authVM as any).pageReload = reload;
    authVM.signOut();
    assert.isNull(authVM.credential);
  });
});
