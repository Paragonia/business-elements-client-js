"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Values} */
describe("Values", () => {
  let sandbox, client, values;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    values = client.tenant("example.com").values();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Values#list} */
  describe("#list()", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be:value" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should list tenant values", () => {
      values.list();

      sinon.assert.calledWithMatch(client.execute, {
        path: "/values"
      });
    });

    it("should return the list of values", () => {
      return values.list().should.become(data);
    });
  });

});
