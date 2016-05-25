"use strict";

import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";
import Tenants from "../src/tenants";
import * as requests from "../src/requests";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Tenants} */
describe("Tenants", () => {
  let sandbox, client, tenants;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    tenants = new Tenants(client);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Tenant#projects} */
  describe("#currentTenant()", () => {

    it("should return current tenant", () => {
      sandbox.spy(requests, "currentTenant");
      tenants.currentTenant();
      expect(requests.currentTenant()).to.eql({ method: "GET", headers: {}, path: "/tenants/current" });
    });
  });
});
