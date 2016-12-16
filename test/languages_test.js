"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Languages} */
describe("Languages", () => {
  let sandbox, client, languages;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    languages = client.tenant("example.com").languages();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Languages#list} */
  describe("#listLanguages()", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be:language" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should list tenant languages", () => {
      languages.listLanguages();

      sinon.assert.calledWithMatch(client.execute, {
        path: "/languages/iso"
      });
    });

    it("should return the list of languages", () => {
      return languages.listLanguages().should.become(data);
    });
  });

});
