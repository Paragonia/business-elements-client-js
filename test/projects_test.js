"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";
import Tenant from "../src/tenant";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Projects} */
describe("Projects", () => {
  let sandbox, client, tenant, projects;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    tenant = new Tenant(client, "example.com");
    projects = tenant.projects();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Bucket#listProjects} */
  describe("#listProjects()", () => {
    const data = [{id: "a"}, {id: "b"}];

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should list tenant projects", () => {
      projects.listProjects();

      sinon.assert.calledWithMatch(client.execute, {
        path: "/projects"
      });
    });

    it("should return the list of projects", () => {
      return projects.listProjects().should.become(data);
    });
  });

});
