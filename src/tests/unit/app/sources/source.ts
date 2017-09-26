import { assert } from "chai";
import * as registerSuite from "intern/lib/interfaces/object";
import { mock, SinonSpy, spy, stub } from "sinon";
import promiseUtils = require("esri/core/promiseUtils");

import Source from "../../../../app/sources/source";
import esriRequest = require("esri/request");

registerSuite({
  name: "app/sources/source",
  setup() {},
  beforeEach() {},
  afterEach() {},
  teardown() {},

  "source can fetch simple request"() {
    const source = new Source({ url: "tester/api/people" });
    const stubSource = stub(source, "request").resolves(promiseUtils.resolve());
    source.fetch("sam");
    assert.ok(stubSource.calledWith("tester/api/people/sam"));
    stubSource.restore();
  },

  "source can fetch id and query"() {
    const source = new Source({ url: "tester/api/people" });
    const stubSource = stub(source, "request").resolves(promiseUtils.resolve());
    source.fetch("sam", { f: "json" });
    assert.ok(
      stubSource.calledWith("tester/api/people/sam", { query: { f: "json" } })
    );
    stubSource.restore();
  },

  "source can fetch id as number and query"() {
    const source = new Source({ url: "tester/api/people" });
    const stubSource = stub(source, "request").resolves(promiseUtils.resolve());
    source.fetch(1);
    assert.ok(stubSource.calledWith("tester/api/people", { query: 1 }));
    stubSource.restore();
  },

  "source can fetch just url"() {
    const source = new Source({ url: "tester/api/people" });
    const stubSource = stub(source, "request").resolves(promiseUtils.resolve());
    source.fetch();
    assert.ok(stubSource.calledWith("tester/api/people"));
    stubSource.restore();
  },

  "serializer returns given response"() {
    const source = new Source({ url: "tester/api/people" });
    assert.equal("hello", source.serializer("hello"));
  }
});
