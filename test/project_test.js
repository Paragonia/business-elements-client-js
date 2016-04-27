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

/** @test {Projects} */
describe("Projects", () => {
  let sandbox, client, projectId, project;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    projectId = uuid.v4();
    project = client.tenant("example.com").projects().project(projectId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Project#get} */
  describe("#get()", () => {
    const data = {id: projectId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get project", () => {
      project.get();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/projects/${projectId}`
      });
    });

    it("should return the list of projects", () => {
      return project.get().should.become(data);
    });
  });

});
