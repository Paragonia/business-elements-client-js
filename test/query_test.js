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

/** @test {Query} */
describe("Query", () => {
  let sandbox, client, queryId, query;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    queryId = uuid.v4();
    query = client.tenant("example.com").queries().query(queryId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {query#get} */
  describe("#get()", () => {
    const data = {id: queryId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get query", () => {
      query.get();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/queries/${queryId}`
      });
    });

    it("should return query data", () => {
      return query.get().should.become(data);
    });
  });

  /** @test {Query#remove} */
  describe("#remove()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "deleteQuery");
    });

    it("should delete the query", () => {
      query.delete({});

      sinon.assert.calledWithMatch(requests.deleteQuery, queryId);
    });

    it("should return success", () => {
      return query.delete({}).should.eventually.become(response);
    });
  });

  /** @test {Query#addQueryFilter} */
  describe("#addQueryFilter()", () => {
    const response = {status: "Ok"};
    const queryDefinitionFilter = ["query-filter-1", "query-filter-2"];
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "addQueryFilter");
    });

    it("should add filter to query", () => {
      query.addQueryFilter(queryDefinitionFilter, {});

      sinon.assert.calledWithMatch(requests.addQueryFilter, queryId, queryDefinitionFilter);
    });

    it("should return success", () => {
      return query.addQueryFilter({}).should.eventually.become(response);
    });
  });

});
