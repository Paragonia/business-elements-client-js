"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import uuid from "uuid";
import BusinessElementsClient from "../src";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Values} */
describe("Values", () => {
  let sandbox, client, values, projectId;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    projectId = uuid.v4();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    values = client.tenant("example.com").values();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Values#list} */
  describe("#list()", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded": {
        "be:value": data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should list tenant values", () => {
      values.list();

      sinon.assert.calledWithMatch(client.execute, {
        path: "/values"
      });
    });

    it("should return the list of values", () => {
      return values.list().should.become(data);
    });
  });

  /** @test {Values#search} */
  describe("#search()", () => {

    const searchText = "search text";
    const searchResult = {
      "resources" : [ "a", "b"],
      "values" : [ "c", "d"]
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(searchResult));
    });

    it("should search values", () => {
      values.search(projectId, searchText);

      sinon.assert.calledWithMatch(client.execute, {
        method: "POST",
        path: `/values/search/project/${projectId}`,
        body: {
          "searchText": searchText
        }
      });
    });

    it("should return the list of values", () => {
      return values.search(projectId, searchText).should.become(searchResult);
    });
  });

  /** @test {Values#suggestions} */
  describe("#suggestions()", () => {
    const attributeHandle = "attributeHandle";
    const data = { "property": "value" };
    const embeddedValues = [{"id":"a"}, {"id":"b"}, {"id":"c"}];
    const searchResult = {
      "_embedded" : {
        "be:value": embeddedValues
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(searchResult));
    });

    it("should suggest values", () => {
      values.suggestions(projectId, attributeHandle, data);

      sinon.assert.calledWithMatch(client.execute, {
        method: "POST",
        path: `/values/suggestions/project/${projectId}`,
        body: {
          "attributeHandle": attributeHandle,
          "data": data
        }
      });
    });

    it("should return the list of suggested values", () => {
      return values.suggestions(projectId, attributeHandle, data).should.become(embeddedValues);
    });
  });

});
