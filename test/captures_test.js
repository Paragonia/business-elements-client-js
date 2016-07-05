"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Captures} */
describe("Captures", () => {
  let sandbox, client, captures;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    captures = client.tenant("example.com").captures();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Captures#list} */
  describe("#list()", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be:capture" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should list tenant captures", () => {
      captures.list();

      sinon.assert.calledWithMatch(client.execute, {
        path: "/captures"
      });
    });

    it("should return the list of captures", () => {
      return captures.list().should.become(data);
    });
  });

});
