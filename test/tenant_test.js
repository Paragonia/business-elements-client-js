"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Tenant} */
describe("Tenant", () => {
  let sandbox, client, tenant;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    tenant = client.tenant("example.com");
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Tenant#projects} */
  describe("#projects()", () => {

    it("should return projects", () => {
      return tenant.projects().should.exist;
    });
  });

  /** @test {Tenant#users} */
  describe("#users()", () => {

    it("should return users", () => {
      return tenant.users().should.exist;
    });
  });
});
