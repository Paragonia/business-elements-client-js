"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {fakeServerResponse} from "./test_utils.js";
import sinon from "sinon";
import BusinessElementsClient from "../src";

import * as requests from "../src/requests";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Attributes} */
describe("Attributes", () => {
  let sandbox, client, attributes;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    attributes = client.tenant("example.com").attributes();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Attributes#list} */
  describe("#list()", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
    });

    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be:attribute" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should call attributes list url", () => {
      attributes.list({});

      sinon.assert.calledWithMatch(client.execute, {
        path: "/attributes"
      });
    });

    it("should return the list of attributes", () => {
      return attributes.list({}).should.become(data);
    });
  });

  /** @test {Attributes#create} */
  describe("#create", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "createAttribute");
    });

    const name = "exhibition name";
    const schema = {
      "type": "object",
      "properties": {
        "type": {
          "title": "type",
          "type": "string"
        }
      }
    };

    it("should execute request", () => {
      attributes.create(name, schema, {});
      sinon.assert.calledWithMatch(requests.createAttribute, name, schema);
    });

  });

});
