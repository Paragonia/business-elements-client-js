"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";
import uuid from "uuid";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Organization} */
describe("Organization", () => {
  let sandbox, client, organizationId, organization;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    organizationId = uuid.v4();
    organization = client.tenant("example.com").organizations().organization(organizationId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Organization#get} */
  describe("#get()", () => {
    const data = {id: organizationId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get organization", () => {
      organization.get();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/organizations/${organizationId}`
      });
    });

    it("should return organization data", () => {
      return organization.get().should.become(data);
    });
  });

});
