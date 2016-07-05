"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";
import uuid from "uuid";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Teams} */
describe("Teams", () => {
  let sandbox, client, teams, orgId;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    orgId = uuid.v4();
    teams = client.tenant("example.com").organizations().organization(orgId).teams();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Projects#list} */
  describe("#list()", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be:team" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should list teams in organization", () => {
      teams.list();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/organizations/${orgId}/teams`
      });
    });

    it("should return the list of teams", () => {
      return teams.list().should.become(data);
    });
  });

});
