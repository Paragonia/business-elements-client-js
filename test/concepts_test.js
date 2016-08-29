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

/** @test {Concepts} */
describe("Concepts", () => {
  let sandbox, client, concepts;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    concepts = client.tenant("example.com").concepts();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Concepts#list} */
  describe("#list()", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be:concept" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should call concepts url", () => {
      concepts.list();

      sinon.assert.calledWithMatch(client.execute, {
        path: "/concepts"
      });
    });

    it("should return the list of concepts", () => {
      return concepts.list().should.become(data);
    });
  });

  /** @test {Concepts#createÏ} */
  describe("#create", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "createConcept");
    });

    it("should execute request", () => {
      concepts.create("conceptHandle", {"title": "My concept"});

      sinon.assert.calledWithMatch(requests.createConcept, "conceptHandle", {"title": "My concept"});
    });

  });

});
