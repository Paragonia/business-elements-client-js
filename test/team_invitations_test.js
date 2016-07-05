"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";
import * as requests from "../src/requests";
import uuid from "uuid";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {TeamInvitations} */
describe("TeamInvitations", () => {
  let sandbox, client, invitations, orgId, teamId;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    orgId = uuid.v4();
    teamId = uuid.v4();
    invitations = client.tenant("example.com").organizations().organization(orgId).teams().team(teamId).invitations();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {TeamInvitations#list} */
  describe("#list()", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded": {
        "be:team_invitation": data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should list team invitations", () => {
      invitations.list();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/organizations/${orgId}/teams/${teamId}/invitations`
      });
    });

    it("should return the list of invitations", () => {
      return invitations.list().should.become(data);
    });


  });

  /** @test {TeamInvitations#create} */
  describe("#create()", () => {
    const invitation = {emailAddress: "m@be.com"};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(invitation));
      sandbox.spy(requests, "sentTeamInvitation");
    });

    it("should execute expected request", () => {
      invitations.create("m@be.com");
      sinon.assert.calledWithMatch(requests.sentTeamInvitation, orgId, teamId, "m@be.com");
    });

    it("should create an invitation", () => {
      return invitations.create("m@be.com").should.become(invitation);
    });

  });

});
