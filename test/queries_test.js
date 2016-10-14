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

/** @test {Queries} */
describe("Queries", () => {
  let sandbox, client, queries;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    queries = client.tenant("example.com").queries();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Queries#list} */
  describe("#list()", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be:query" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should list tenant queries", () => {
      queries.list();

      sinon.assert.calledWithMatch(client.execute, {
        path: "/queries"
      });
    });

    it("should return the list of queries", () => {
      return queries.list().should.become(data);
    });
  });

  /** @test {Queries#create} */
  describe("#create", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "createQuery");
    });

    const conceptId = "query concept id";
    const collectionName = "query collection name";

    it("should execute request", () => {
      queries.create(conceptId, collectionName, {});
      sinon.assert.calledWithMatch(requests.createQuery, conceptId, collectionName);
    });

  });

});
