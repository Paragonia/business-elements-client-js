"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";
import uuid from "uuid";
import {fakeServerResponse} from "./test_utils.js";

import * as requests from "../src/requests";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const root = typeof window === "object" ? window : global;
const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Invitation} */
describe("Invitation", () => {
  let sandbox, client, invitationId, invitation;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    invitationId = uuid.v4();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    invitation = client.tenant("example.com").invitation();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Invitation#acceptTeamMemberInvtation} */
  describe("#acceptTeamMemberInvitation()", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(202, {}, {}));
      sandbox.spy(requests, "acceptTeamMemberInvitation");
    });

    it("should accept the invitation", () => {
      invitation.acceptTeamMemberInvitation(invitationId, "some@some-email.com", "1234", {});
      sinon.assert.calledWithMatch(requests.acceptTeamMemberInvitation, invitationId, "some@some-email.com", "1234");
    });

    it("should return success", () => {
      return invitation.acceptTeamMemberInvitation(invitationId, "some@some-email.com", "1234", {}).should.eventually.become({});
    });
  });

});
