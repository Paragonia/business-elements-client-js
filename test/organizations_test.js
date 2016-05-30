"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Organizations} */
describe("Organizations", () => {
  let sandbox, client, organizations;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    organizations = client.tenant("example.com").organizations();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Organizations#list} */
  describe("#list()", () => {
    const data = [{id: "a"}, {id: "b"}];

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should list tenant organizations", () => {
      organizations.list();

      sinon.assert.calledWithMatch(client.execute, {
        path: "/organizations"
      });
    });

    it("should return the list of organizations", () => {
      return organizations.list().should.become(data);
    });
  });

});
