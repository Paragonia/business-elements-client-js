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

/** @test {Attribute} */
describe("Attribute", () => {
  let sandbox, client, attributeId, attribute;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    attributeId = uuid.v4();
    attribute = client.tenant("example.com").attributes().attribute(attributeId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Attribute#get} */
  describe("#get()", () => {
    const data = {id: attributeId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get capture", () => {
      attribute.get();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/attributes/${attributeId}`
      });
    });

    it("should return attribute data", () => {
      return attribute.get().should.become(data);
    });
  });

  /** @test {Attribute#edit} */
  describe("#edit()", () => {
    const response = {status: "Ok"};
    const schema = {
      "type": "object",
      "properties": {
        "type": {
          "title": "type",
          "type": "string"
        }
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "updateAttribute");
    });

    it("should edit the attribute", () => {
      attribute.edit(schema, {});
      sinon.assert.calledWithMatch(requests.updateAttribute, attributeId, schema);
    });

    it("should return success", () => {
      return attribute.edit(schema, {}).should.eventually.become(response);
    });
  });

  /** @test {Attribute#remove} */
  describe("#remove()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "deleteAttribute");
    });

    it("should delete the attribute", () => {
      attribute.remove({});

      sinon.assert.calledWithMatch(requests.deleteAttribute, attributeId);
    });

    it("should return success", () => {
      return attribute.remove({}).should.eventually.become(response);
    });
  });

});
