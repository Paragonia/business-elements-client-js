"use strict";

import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import { fakeServerResponse } from "./test_utils.js";
import BusinessElementsClient from "../src";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {BusinessElementsClient} */
describe("BusinessElementsClient", () => {
  let sandbox, api;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    api = new BusinessElementsClient(FAKE_SERVER_URL);
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

  /** @test {BusinessElementsClient#fetchServerInfo} */
  describe("#fetchServerInfo", () => {
    const fakeServerInfo = {version: "0.0.1", build: "Sunday, April 24, 2016 11:54:17 AM UTC"};

    it("should retrieve server settings on first request made", () => {
      sandbox.stub(root, "fetch")
        .returns(fakeServerResponse(200, fakeServerInfo));

      return api.fetchServerInfo()
        .should.eventually.become(fakeServerInfo);
    });

    it("should store server settings into the serverSettings property", () => {
      api.serverSettings = {a: 1};
      sandbox.stub(root, "fetch");

      api.fetchServerInfo();
    });

    it("should not fetch server settings if they're cached already", () => {
      api.serverInfo = fakeServerInfo;
      sandbox.stub(root, "fetch");

      api.fetchServerInfo();
      sinon.assert.notCalled(fetch);
    });
  });

  /** @test {BusinessElementsClient#fetchServerVersion} */
  describe("#fetchServerVersion()", () => {
    const fakeServerInfo = {version: "0.0.1"};

    it("should retrieve server settings", () => {
      sandbox.stub(root, "fetch")
        .returns(fakeServerResponse(200, fakeServerInfo));

      return api.fetchServerVersion()
        .should.eventually.become("0.0.1");
    });
  });

  /** @test {BusinessElementsClient#fetchServerBuildTime} */
  describe("#fetchServerBuildTime()", () => {
    const fakeServerInfo = {build: "Sunday, April 24, 2016 11:54:17 AM UTC"};

    it("should retrieve server capabilities", () => {
      sandbox.stub(root, "fetch")
        .returns(fakeServerResponse(200, fakeServerInfo));

      return api.fetchServerBuildTime()
        .should.eventually.become("Sunday, April 24, 2016 11:54:17 AM UTC");
    });
  });


});
