"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {fakeServerResponse} from "./test_utils.js";
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
  let sandbox, client, projectId, instanceId, instance, projectInstance;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    projectId = uuid.v4();
    instanceId = uuid.v4();

    projectInstance = client.tenant("example.com").projects().project(projectId).instances().instance(instanceId);
    instance = client.tenant("example.com").instances().instance(instanceId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Instance#getProjectInstance} */
  describe("#getProjectInstance()", () => {
    const data = {id: instanceId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get project instance", () => {
      projectInstance.getProjectInstance();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/projects/${projectId}/instances/${instanceId}`
      });
    });

    it("should return instance data", () => {
      return projectInstance.getProjectInstance().should.become(data);
    });
  });

  /** @test {Instance#getInstance} */
  describe("#getInstance()", () => {
    const data = {id: instanceId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get instance", () => {
      instance.getInstance();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/instances/${instanceId}`
      });
    });

    it("should return instance data", () => {
      return instance.getInstance().should.become(data);
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
      projectInstance.remove({});

      sinon.assert.calledWithMatch(requests.deleteInstance, projectId, instanceId);
    });

    it("should return success", () => {
      return projectInstance.remove({}).should.eventually.become(response);
    });
  });

  /** @test {ProjectInstance#update} */
  describe("#update()", () => {
    const response = {status: "Ok"};
    const updateOperations = [{"op": "add"}, {"op": "remove"}];
    const relations = ["concept-handle-1", "concept-handle-2"];

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "updateInstance");
    });

    it("should update the instance", () => {
      projectInstance.update(updateOperations, relations, {});

      sinon.assert.calledWithMatch(requests.updateInstance, projectId, instanceId, updateOperations, relations);
    });

    it("should return success", () => {
      return projectInstance.update({}).should.eventually.become(response);
    });
  });


  /** @test {ProjectInstance#addInstanceValues} */
  describe("#addInstanceValues()", () => {
    const response = {status: "Ok"};
    const values = [{"v1": uuid.v4()}, {"v2": uuid.v4()}];

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "addInstanceValues");
    });

    it("should update the instance", () => {
      projectInstance.addInstanceValues(values, {});

      sinon.assert.calledWithMatch(requests.addInstanceValues, projectId, instanceId, values);
    });

    it("should return success", () => {
      return projectInstance.addInstanceValues({}).should.eventually.become(response);
    });
  });

  /** @test {Instance#specifyInstanceRelation} */
  describe("#specifyInstanceRelation()", () => {
    const response = {status: "Ok"};
    const specificationId = "111-222-333";
    const subjectId = "aaa-bbb-ccc";
    const subjectType = "Instance";
    const objectId = "ddd-eee-fff";
    const objectType = "Concept";

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "specifyInstanceRelation");
    });

    it("should specify the instance relation", () => {
      projectInstance.specifyInstanceRelation(specificationId, subjectId, subjectType, objectId, objectType, {});

      sinon.assert.calledWithMatch(requests.specifyInstanceRelation, projectId, instanceId, specificationId, subjectId, subjectType, objectId, objectType);
    });

    it("should return success", () => {
      return projectInstance.update({}).should.eventually.become(response);
    });
  });

  /** @test {Instance#searchTags} */
  describe("#searchTags", () => {
    const tags = [{tag: "a"}, {tag: "b"}];
    const actual = {
      "_embedded": {
        "be:tag": tags
      }
    };

    beforeEach(()=> {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
      sandbox.spy(requests, "searchTags");
    });

    it("should call tags url", () => {
      projectInstance.searchTags();

      sinon.assert.calledWithMatch(client.execute, {
        path: "/search/tags"
      });
    });

    it("should return the list of tags", () => {
      return projectInstance.searchTags().should.become(tags);
    });
  });

  /** @test {ProjectInstance#addInstanceTag} */
  describe("#addInstanceTag()", () => {
    const response = {status: "OK"};
    const tag = "tag";

    beforeEach(()=> {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "addInstanceTag");
    });

    it("should add a tag to the instance", () => {
      projectInstance.addInstanceTag(tag);

      sinon.assert.calledWithMatch(requests.addInstanceTag, projectId, instanceId, tag);
    });
  });

  /** @test {ProjectInstance#removeInstanceTag} */
  describe("#removeInstanceTag()", () => {
    const response = {status: "OK"};
    const tag = "tag";

    beforeEach(()=> {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "removeInstanceTag");
    });

    it("should remove a tag from the instance", () => {
      projectInstance.removeInstanceTag(tag);

      sinon.assert.calledWithMatch(requests.removeInstanceTag, projectId, instanceId, tag);
    });
  });

});
