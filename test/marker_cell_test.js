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

/** @test {Marker Cell} */
describe("MarkerCell", () => {
  let sandbox, client, markerCellId, markerCell;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    markerCellId = uuid.v4();
    markerCell = client.tenant("example.com").markers().markerCell(markerCellId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {MarkerCell#get} */
  describe("#get()", () => {
    const data = {id: markerCellId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get marker cell", () => {
      markerCell.get();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/markers/${markerCellId}`
      });
    });

    it("should return marker cell data", () => {
      return markerCell.get().should.become(data);
    });
  });

  /** @test {MarkerCell#remove} */
  describe("#remove()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "deleteMarkerCell");
    });

    it("should delete the marker cell", () => {
      markerCell.remove({});

      sinon.assert.calledWithMatch(requests.deleteMarkerCell, markerCellId);
    });

    it("should return success", () => {
      return markerCell.remove({}).should.eventually.become(response);
    });
  });

  /** @test {MarkerCell#updateMarkerCell} */
  describe("#updateMarkerCell()", () => {
    const response = {status: "Ok"};
    const name = "Some Marker Cell Name";
    const color = "rgb(1,1,1)";
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "updateMarkerCell");
    });

    it("should set marker cell name", () => {
      markerCell.updateMarkerCell(name, color, {});

      sinon.assert.calledWithMatch(requests.updateMarkerCell, markerCellId, name, color);
    });

    it("should return success", () => {
      return markerCell.updateMarkerCell({}).should.eventually.become(response);
    });
  });

});
