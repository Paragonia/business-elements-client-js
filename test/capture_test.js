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

/** @test {Capture} */
describe("Capture", () => {
  let sandbox, client, captureId, capture;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    captureId = uuid.v4();
    capture = client.tenant("example.com").captures().capture(captureId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Capture#get} */
  describe("#get()", () => {
    const data = {id: captureId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get capture", () => {
      capture.get();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/captures/${captureId}`
      });
    });

    it("should return capture data", () => {
      return capture.get().should.become(data);
    });
  });

  /** @test {Capture#edit} */
  describe("#edit()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "editCapture");
    });

    it("should edit the capture", () => {
      capture.edit("description", {});

      sinon.assert.calledWithMatch(requests.editCapture, captureId, "description");
    });

    it("should return success", () => {
      return capture.edit("description", {}).should.eventually.become(response);
    });
  });

  /** @test {Capture#remove} */
  describe("#remove()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "deleteCapture");
    });

    it("should delete the team", () => {
      capture.remove({});

      sinon.assert.calledWithMatch(requests.deleteCapture, captureId);
    });

    it("should return success", () => {
      return capture.remove({}).should.eventually.become(response);
    });
  });

});
