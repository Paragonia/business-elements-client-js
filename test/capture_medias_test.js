"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import uuid from "uuid";
import BusinessElementsClient from "../src";
import * as requests from "../src/requests";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {CaptureMedias} */
describe("CaptureMedias", () => {
  let sandbox, client, captureId, medias;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    captureId = uuid.v4();
    medias = client.tenant("example.com").captures().capture(captureId).medias();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {CaptureMedias#list} */
  describe("#list()", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be:capture_media" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should list tenant captures", () => {
      medias.list();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/captures/${captureId}/media`
      });
    });

    it("should return the list of captures", () => {
      return medias.list().should.become(data);
    });
  });

  /** @test {CaptureMedias#add} */
  describe("#add()", () => {
    const requestsMedia = [
      {
        type : "image",
        data: {
          resourceUri: "resource:image/jpeg,user-existing"
        }
      },
      {
        type : "image",
        data: {
          resourceUri: "resource:image/jpeg,user-12345678"
        }
      }
    ];

    const media = {
      type : "image",
      data: {
        resourceUri: "resource:image/jpeg,user-12345678"
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(requestsMedia));
      sandbox.spy(requests, "addCaptureMedia");
    });

    it("should execute expected request", () => {
      medias.add(media);
      sinon.assert.calledWithMatch(requests.addCaptureMedia, captureId, media);
    });

    it("should return media and the existing ones", () => {
      return medias.add(media).should.become(requestsMedia);
    });

  });

});
