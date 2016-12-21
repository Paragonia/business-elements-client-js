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

/** @test {Value} */
describe("Value", () => {
  let sandbox, client, valueId, projectId, value;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    valueId = uuid.v4();
    projectId = uuid.v1();
    value = client.tenant("example.com").values().value(valueId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Value#get} */
  describe("#get()", () => {
    const data = {id: valueId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get value", () => {
      value.get();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/values/${valueId}`
      });
    });

    it("should return value data", () => {
      return value.get().should.become(data);
    });
  });

  /** @test {Value#edit} */
  describe("#edit()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "editValue");
    });

    it("should edit the value", () => {
      value.edit(projectId, "handle", value, {});

      sinon.assert.calledWithMatch(requests.editValue, valueId, projectId, "handle", value);
    });

    it("should return success", () => {
      return value.edit(projectId, "handle", value, {}).should.eventually.become(response);
    });
  });

  /** @test {Value#remove} */
  describe("#remove()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "deleteValue");
    });

    it("should delete the value", () => {
      value.remove(projectId, {});

      sinon.assert.calledWithMatch(requests.deleteValue, valueId, projectId);
    });

    it("should return success", () => {
      return value.remove({}).should.eventually.become(response);
    });
  });

  /** @test {ValueHistory#list} */
  describe("#listValueHistory()", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be:valueHistory" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should list tenant value history", () => {
      value.listValueHistory(valueId);

      sinon.assert.calledWithMatch(client.execute, {
        path: `/values/${valueId}/history`
      });
    });

    it("should return the list of value history", () => {
      return value.listValueHistory(valueId).should.become(data);
    });
  });

});
