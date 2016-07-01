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

/** @test {TeamMembers} */
describe("TeamMembers", () => {
  let sandbox, client, members, orgId, teamId;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    orgId = uuid.v4();
    teamId = uuid.v4();
    members = client.tenant("example.com").organizations().organization(orgId).teams().team(teamId).members();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {TeamMembers#list} */
  describe("#list()", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded": {
        "be:teamMembers": data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should list team members", () => {
      members.list();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/organizations/${orgId}/teams/${teamId}/members`
      });
    });

    it("should return the list of members", () => {
      return members.list().should.become(data);
    });


  });

  /** @test {TeamMembers#create} */
  describe("#create()", () => {
    const member = {emailAddress: "m@be.com"};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(member));
      sandbox.spy(requests, "addTeamMember");
    });

    it("should execute expected request", () => {
      members.create("m@be.com");
      sinon.assert.calledWithMatch(requests.addTeamMember, orgId, teamId, "m@be.com");
    });

    it("should create a member", () => {
      return members.create("m@be.com").should.become(member);
    });

  });

});
