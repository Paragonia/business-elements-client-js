"use strict";

import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";
import { SUPPORTED_PROTOCOL_VERSION as SPV } from "../src/base";

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
    const sampleRemote = `https://api.businesselements.org/${SPV}`;

    console.log(sampleRemote);

    it("should check that `remote` is a string", () => {
      expect(() => new BusinessElementsClient(42))
        .to.Throw(Error, /Invalid remote URL/);
    });

    it("should validate `remote` arg value", () => {
      expect(() => new BusinessElementsClient("http://nope"))
        .to.Throw(Error, /The remote URL must contain the version/);
    });

    it("should strip any trailing slash", () => {
      expect(new BusinessElementsClient(sampleRemote).remote).eql(sampleRemote);
    });

    it("should assign version value", () => {
      expect(new BusinessElementsClient(sampleRemote).version).eql(SPV);
    });

    it("should accept a headers option", () => {
      expect(new BusinessElementsClient(sampleRemote, {headers: {Foo: "Bar"}})
              .defaultReqOptions.headers).eql({Foo: "Bar"});
    });

    it("should validate protocol version", () => {
      expect(() => new BusinessElementsClient("http://test/v999"))
        .to.Throw(Error, /^Unsupported protocol version/);
    });

    it("should propagate the requestMode option to the child HTTP instance", () => {
      const requestMode = "no-cors";
      expect(new BusinessElementsClient(sampleRemote, {requestMode}).http.requestMode).eql(requestMode);
    });

  });
});
