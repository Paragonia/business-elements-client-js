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

  /** @test {Tenant#uploadOptions} */
  describe("#uploadOptions()", () => {

    it("should return uploadOptions", () => {
      const authenticationToken = "0000000000000000-0000000000000000-0000000000000000-0000000000000000";
      client.authenticationToken = authenticationToken;

      const options = tenant.uploadOptions();
      options.remote.should.equal(FAKE_SERVER_URL + "/upload");
      options.headers.tenant.should.equal("example.com");
      options.headers["Authentication-Token"].should.equal(authenticationToken);
    });
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
