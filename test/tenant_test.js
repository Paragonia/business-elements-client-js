"use strict";

import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import { fakeServerResponse } from "./test_utils.js";
import BusinessElementsClient from "../src";
import * as requests from "../src/requests";
import Tenant from "../src/tenant";

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
    tenant = new Tenant(client, "example.com");
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Tenant#isEmailAvailable} */
  describe("#isEmailAvailable()", () => {

    it("should return true for available email address", () => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(202, {}, {}));
      return tenant.isEmailAvailable("test@example.com").should.eventually.become(true);
    });

    it("should return false for unavailable email address", () => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(400, {}, {}));
      return tenant.isEmailAvailable("test@example.com").should.eventually.become(false);
    });

    it("should validate correct email input", () => {
      expect(() => tenant.isEmailAvailable(null)).to.Throw(Error, /An email address is required/);
    });
  });

  /** @test {Tenant#createUser} */
  describe("#createUser", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "createUser");
      // sandbox.stub(client, "execute").returns(Promise.resolve());

    });

    it("should execute expected request without password", () => {
      tenant.createUser("test@example.com");

      sinon.assert.calledWithMatch(requests.createUser, "test@example.com", undefined, {
        headers: { "tenant": "example.com" }
      });
    });

    it("should execute expected request with password", () => {
      tenant.createUser("test@example.com", "password");

      sinon.assert.calledWithMatch(requests.createUser, "test@example.com", "password", {
        headers: { "tenant": "example.com" }
      });
    });

    it("should require correct email input", () => {
      expect(() => tenant.createUser(null)).to.Throw(Error, /An email address is required/);
    });

  });
});
