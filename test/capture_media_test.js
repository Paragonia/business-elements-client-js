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

/** @test {CaptureMedia} */
describe("CaptureMedia", () => {
  let sandbox, client, captureId, captureMedia, captureMediaId;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    captureId = uuid.v4();
    captureMediaId = uuid.v4();
    captureMedia = client.tenant("example.com").captures().capture(captureId).medias().media(captureMediaId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {CaptureMedia#get} */
  describe("#get()", () => {
    const data = {id: captureMediaId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get capture media", () => {
      captureMedia.get();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/captures/${captureId}/media/${captureMediaId}`
      });
    });

    it("should return capture data", () => {
      return captureMedia.get().should.become(data);
    });
  });

  /** @test {CaptureMedia#remove} */
  describe("#remove()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "deleteCaptureMedia");
    });

    it("should delete the team", () => {
      captureMedia.remove({});

      sinon.assert.calledWithMatch(requests.deleteCaptureMedia, captureId, captureMediaId);
    });

    it("should return success", () => {
      return captureMedia.remove({}).should.eventually.become(response);
    });
  });

});
