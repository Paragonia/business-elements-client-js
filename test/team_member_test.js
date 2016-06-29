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

/** @test {Team} */
describe("TeamMember", () => {
  let sandbox, client, orgId, teamId, memberId, member;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    orgId = uuid.v4();
    teamId = uuid.v4();
    memberId = uuid.v4();
    member = client.tenant("example.com").organizations().organization(orgId).teams().team(teamId).members().member(memberId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {TeamMember#get} */
  describe("#get()", () => {
    const data = {id: memberId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get member", () => {
      member.get();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/organizations/${orgId}/teams/${teamId}/members/${memberId}`
      });
    });

    it("should return team member data", () => {
      return member.get().should.become(data);
    });
  });

  
  /** @test {TeamMember#remove} */
  describe("#remove()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "deleteTeamMember");
    });
  
    it("should delete the member from the team", () => {
      member.remove({});
  
      sinon.assert.calledWithMatch(requests.deleteTeamMember, orgId, teamId, memberId);
    });
  
    it("should return success", () => {
      return member.remove("name", {}).should.eventually.become(response);
    });
  });

});
