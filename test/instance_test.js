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

  /** @test {Instance#remove} */
  describe("#remove()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "deleteInstance");
    });

    it("should delete the instance", () => {
      instance.remove({});

      sinon.assert.calledWithMatch(requests.deleteInstance, projectId, instanceId);
    });

    it("should return success", () => {
      return instance.remove({}).should.eventually.become(response);
    });
  });

  /** @test {Instance#update} */
  describe("#update()", () => {
    const response = {status: "Ok"};
    const updateOperations = [{"op": "add"}, {"op": "remove"}];

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "updateInstance");
    });

    it("should update the instance", () => {
      instance.update(updateOperations, {});

      sinon.assert.calledWithMatch(requests.updateInstance, projectId, instanceId, updateOperations);
    });

    it("should return success", () => {
      return instance.update({}).should.eventually.become(response);
    });
  });

});
