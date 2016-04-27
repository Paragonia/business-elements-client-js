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

/** @test {Users} */
describe("Users", () => {
  let sandbox, client, tenant, users;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    tenant = new Tenant(client, "example.com");
    users = tenant.users();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Users#isEmailAvailable} */
  describe("#isEmailAvailable()", () => {

    it("should return true for available email address", () => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(202, {}, {}));
      return users.isEmailAvailable("test@example.com").should.eventually.become(true);
    });

    it("should return false for unavailable email address", () => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(400, {}, {}));
      return users.isEmailAvailable("test@example.com").should.eventually.become(false);
    });

    it("should validate correct email input", () => {
      expect(() => users.isEmailAvailable(null)).to.Throw(Error, /An email address is required/);
    });
  });

  /** @test {Users#createÏ} */
  describe("#create", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "createUser");
    });

    it("should execute expected request without password", () => {
      users.create("test@example.com");

      sinon.assert.calledWithMatch(requests.createUser, "test@example.com", undefined, {
        headers: { "tenant": "example.com" }
      });
    });

    it("should execute expected request with password", () => {
      users.create("test@example.com", "password");

      sinon.assert.calledWithMatch(requests.createUser, "test@example.com", "password", {
        headers: { "tenant": "example.com" }
      });
    });

    it("should require correct email input", () => {
      expect(() => users.create(null)).to.Throw(Error, /An email address is required/);
    });

  });

  /** @test {Users#activate} */
  describe("#activate", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "activateUser");
    });

    it("should execute expected request", () => {
      users.activate("cb97a61a-32ca-408c-afb6-b9f11abdf881", "12345678");

      sinon.assert.calledWithMatch(requests.activateUser, "cb97a61a-32ca-408c-afb6-b9f11abdf881", "12345678", {
        headers: { "tenant": "example.com" }
      });
    });

    it("should require a user id", () => {
      expect(() => users.activate(null)).to.Throw(Error, /A user id is required./);
    });

    it("should require an activation code", () => {
      expect(() => users.activate("cb97a61a-32ca-408c-afb6-b9f11abdf881", null)).to.Throw(Error, /An activation code is required./);
    });

  });

});
