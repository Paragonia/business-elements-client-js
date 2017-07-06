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
describe("Teams", () => {
  let sandbox, client, orgId, teamId, team;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    orgId = uuid.v4();
    teamId = uuid.v4();
    team = client.tenant("example.com").organizations().organization(orgId).teams().team(teamId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Team#get} */
  describe("#get()", () => {
    const data = {id: teamId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get team", () => {
      team.get();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/organizations/${orgId}/teams/${teamId}`
      });
    });

    it("should return team data", () => {
      return team.get().should.become(data);
    });
  });

  /** @test {Team#edit} */
  describe("#edit()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "updateTeam");
    });

    it("should edit the team", () => {
      team.edit("name", "description", "visibility", {});

      sinon.assert.calledWithMatch(requests.updateTeam, orgId, teamId, "name", "description", "visibility");
    });

    it("should return success", () => {
      return team.edit("name", "description", "visibility", {}).should.eventually.become(response);
    });
  });

  describe("#specifyOwnerTeam()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "specifyOwnerTeam");
    });

    it("should edit the owner team", () => {
      team.specifyOwnerTeam(true, {});

      sinon.assert.calledWithMatch(requests.specifyOwnerTeam, orgId, teamId, true);
    });

    it("should return success", () => {
      return team.specifyOwnerTeam(true, {}).should.eventually.become(response);
    });
  });

  /** @test {Team#remove} */
  describe("#remove()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "deleteTeam");
    });

    it("should delete the team", () => {
      team.remove({});

      sinon.assert.calledWithMatch(requests.deleteTeam, orgId, teamId);
    });

    it("should return success", () => {
      return team.edit("name", {}).should.eventually.become(response);
    });
  });

});
