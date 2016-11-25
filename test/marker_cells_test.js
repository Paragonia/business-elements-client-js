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

/** @test {Marker Cells} */
describe("Marker Cells", () => {
  let sandbox, client, markers;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    markers = client.tenant("example.com").markers();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {MarkerCells#list} */
  describe("#list()", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be:marker" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should list markers", () => {
      markers.list();

      sinon.assert.calledWithMatch(client.execute, {
        path: "/markers"
      });
    });

    it("should return the list of markers", () => {
      return markers.list().should.become(data);
    });
  });

  /** @test {MarkerCells#create} */
  describe("#create", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "createMarkerCell");
    });

    const projectContextId = "context-id";
    const position = "position";

    it("should execute request", () => {
      markers.create(projectContextId, position, {});
      sinon.assert.calledWithMatch(requests.createMarkerCell, projectContextId, position);
    });

  });

});
