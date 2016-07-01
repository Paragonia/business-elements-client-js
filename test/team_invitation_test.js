"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";
import uuid from "uuid";

import * as requests from "../src/requests";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {TeamInvitation} */
describe("TeamInvitation", () => {
  let sandbox, client, orgId, teamId, invitationId, invitation;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    orgId = uuid.v4();
    teamId = uuid.v4();
    invitationId = uuid.v4();
    invitation = client.tenant("example.com").organizations().organization(orgId).teams().team(teamId).invitations().teamInvitation(invitationId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {TeamInvitation#get} */
  describe("#get()", () => {
    const data = {id: invitationId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get invitation", () => {
      invitation.get();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/organizations/${orgId}/teams/${teamId}/invitations/${invitationId}`
      });
    });

    it("should return team invitation data", () => {
      return invitation.get().should.become(data);
    });
  });


  /** @test {TeamInvitation#remove} */
  describe("#remove()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "deleteTeamInvitation");
    });

    it("should delete the invitation", () => {
      invitation.remove({});

      sinon.assert.calledWithMatch(requests.deleteTeamInvitation, orgId, teamId, invitationId);
    });

    it("should return success", () => {
      return invitation.remove("name", {}).should.eventually.become(response);
    });
  });


  /** @test {TeamInvitation#accept} */
  describe("#accept()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "acceptTeamInvitation");
    });

    it("should delete the invitation", () => {
      invitation.accept({});

      sinon.assert.calledWithMatch(requests.acceptTeamInvitation, invitationId);
    });

    it("should return success", () => {
      return invitation.accept().should.eventually.become(response);
    });
  });

});
