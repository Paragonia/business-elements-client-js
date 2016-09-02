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

/** @test {Instance} */
describe("Instance", () => {
  let sandbox, client, projectId, instanceId, instance;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    projectId = uuid.v4();
    instanceId = uuid.v4();

    instance = client.tenant("example.com").projects().project(projectId).instances().instance(instanceId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Instance#get} */
  describe("#get()", () => {
    const data = {id: instanceId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get concept", () => {
      instance.get();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/projects/${projectId}/instances/${instanceId}`
      });
    });

    it("should return concept data", () => {
      return instance.get().should.become(data);
    });
  });

});
