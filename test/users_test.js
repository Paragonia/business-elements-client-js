"use strict";

import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import {fakeServerResponse} from "./test_utils.js";
import BusinessElementsClient from "../src";
import * as requests from "../src/requests";
import Tenant from "../src/tenant";
import uuid from "uuid";

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

  /** @test {Users#create} */
  describe("#create", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "createUser");
    });

    it("should execute expected request without password", () => {
      users.create("test@example.com");

      sinon.assert.calledWithMatch(requests.createUser, "test@example.com", undefined);
    });

    it("should execute expected request with password", () => {
      users.create("test@example.com", "password");

      sinon.assert.calledWithMatch(requests.createUser, "test@example.com", "password");
    });

    it("should require correct email input", () => {
      expect(() => users.create(null)).to.Throw(Error, /An email address is required/);
    });

  });

  /** @test {Users#requestInvitation} */
  describe("#requestInvitation", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "requestInvitation");
    });

    it("should succeed", () => {
      users.requestInvitation("test@example.com");

      sinon.assert.calledWithMatch(requests.requestInvitation, "test@example.com");
    });

    it("should require correct email input", () => {
      expect(() => users.requestInvitation(null)).to.Throw(Error, /An email address is required/);
    });

  });

  /** @test {Users#activate} */
  describe("#activate", () => {

    const userId = uuid.v4();

    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "activateUser");
    });

    it("should execute expected request", () => {
      users.activate(userId, "12345678");

      sinon.assert.calledWithMatch(requests.activateUser, userId, "12345678");
    });

    it("should require a user id", () => {
      expect(() => users.activate(null)).to.Throw(Error, /A user id is required./);
    });

    it("should require an activation code", () => {
      expect(() => users.activate(userId, null)).to.Throw(Error, /An activation code is required./);
    });

  });

  /** @test {Users#resetPasswordRequest} */
  describe("#passwordResetRequest", () => {
    beforeEach(()=> {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "passwordResetRequest");
    });

    it("should execute expected request", () => {
      users.passwordResetRequest("email@domain.com");
      sinon.assert.calledWithMatch(requests.passwordResetRequest, "email@domain.com");
    });

    it("should require user email", () => {
      expect(() => users.passwordResetRequest(null)).to.Throw(Error, /A user email is required./);
    });
  });

  /** @test {Users#resetPassword} */
  describe("#passwordReset", () => {
    beforeEach(()=> {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "passwordReset");
    });

    it("should execute expected request", () => {
      users.passwordReset("uid", "code", "password");
      sinon.assert.calledWithMatch(requests.passwordReset, "uid", "code", "password");
    });

    it("should require user id", () => {
      expect(() => users.passwordReset(null)).to.Throw(Error, /A user id is required./);
    });

    it("should require password activation code", () => {
      expect(() => users.passwordReset("uid")).to.Throw(Error, /A password reset code is required./);
    });

    it("should require password", () => {
      expect(() => users.passwordReset("uid", "code")).to.Throw(Error, /A password is required./);
    });
  });

  /** @test {Users#checkRegistrationStatus} */
  describe("#checkRegistrationStatus", () => {
    beforeEach(()=> {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(200, {status: "NotRegistered"}, {}));
    });

    it("should execute expected request", () => {
      return users.checkRegistrationStatus("test@example.com", {}).should.eventually.become({status: "NotRegistered"});
    });

    it("should require user email", () => {
      expect(() => users.checkRegistrationStatus(null)).to.Throw(Error, /A user email is required./);
    });
  });

  /** @test {Users#changePassword} */
  describe("#changePassword", () => {
    beforeEach(()=> {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(204, {status: "NoContent"}, {}));
    });

    it("should execute expected request", () => {
      return users.changePassword("newPassword", {}).should.eventually.become({status: "NoContent"});
    });

    it("should require new password", () => {
      expect(() => users.changePassword(null)).to.Throw(Error, /A new password is required./);
    });
  });

  /** @test {Users#getPerson} */
  describe("#getPerson", () => {
    const data = {id: uuid.v4(), userId: uuid.v4(), roles: [uuid.v4()]};

    beforeEach(()=> {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(200, data, {}));
    });

    it("should return the person details", () => {
      return users.getPerson().should.eventually.become(data);
    });
  });

  /** @test {Users#getRoles} */
  describe("#getRoles", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded": {
        "be:instance": data
      }
    };

    beforeEach(()=> {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(200, data, {}));
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should return the available roles for person", () => {
      return users.getRoles().should.eventually.become(data);
    });
  });

  /** @test {Users#addPersonRole} */
  describe("#addPersonRole", () => {
    const roleId = uuid.v4();
    const data = {id: uuid.v4(), userId: uuid.v4(), roles: [roleId]};

    beforeEach(()=> {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(200, data, {}));
      sandbox.spy(requests, "addPersonRole");
    });

    it("should execute the request", () => {
      users.addPersonRole(roleId);
      sinon.assert.calledWithMatch(requests.addPersonRole, roleId);
    });

    it("should succeed and return the new person", () => {
      return users.addPersonRole(roleId).should.eventually.become(data);
    });
  });

  /** @test {Users#removePersonRole} */
  describe("#removePersonRole", () => {
    const roleId = uuid.v4();
    const data = {id: uuid.v4(), userId: uuid.v4(), roles: []};

    beforeEach(()=> {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(200, data, {}));
      sandbox.spy(requests, "removePersonRole");
    });

    it("should execute the request", () => {
      users.removePersonRole(roleId);
      sinon.assert.calledWithMatch(requests.removePersonRole, roleId);
    });

    it("should succeed and return the new person", () => {
      return users.removePersonRole(roleId).should.eventually.become(data);
    });
  });


});
