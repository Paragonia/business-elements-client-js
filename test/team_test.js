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

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Team} */
describe("Teams", () => {
  let sandbox, client, orgId, teamId, team;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    orgId = uuid.v4();
    teamId = uuid.v4();
    team = client.tenant("example.com").organizations().organization(orgId).teams().team(orgId, teamId);
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
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(fakeServerResponse(200, {status: "Ok"}, {}));
      sandbox.spy(requests, "updateTeam");
    });

    it("should edit the team", () => {
      team.edit("name", {});

      sinon.assert.calledWithMatch(requests.updateTeam, orgId, teamId, "name");
    });

    //it("should return success", () => {
    //  return team.edit("name", {}).should.eventually.become({status: "Ok"});
    //});
  });

});
