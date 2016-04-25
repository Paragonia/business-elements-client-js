"use strict";

import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

/** @test {BusinessElementsClient} */
describe("BusinessElementsClient", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {BusinessElementsClient#constructor} */
  describe("#constructor", () => {
    const sampleRemote = `https://api.business-elements.com`;

    it("should check that `remote` is a string", () => {
      expect(() => new BusinessElementsClient(42))
        .to.Throw(Error, /Invalid remote URL/);
    });

    it("should strip any trailing slash", () => {
      expect(new BusinessElementsClient(sampleRemote).remote).eql(sampleRemote);
    });

    it("should accept a headers option", () => {
      expect(new BusinessElementsClient(sampleRemote, {headers: {Foo: "Bar"}})
              .defaultReqOptions.headers).eql({Foo: "Bar"});
    });

    it("should propagate the requestMode option to the child HTTP instance", () => {
      const requestMode = "no-cors";
      expect(new BusinessElementsClient(sampleRemote, {requestMode}).http.requestMode).eql(requestMode);
    });

  });
});
