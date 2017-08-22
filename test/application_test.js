"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";


chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Application} */
describe("Application", () => {
  let sandbox, client, application, applicationHandle;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    applicationHandle = "applicationHandle";
    application = client.tenant("example.com").applications().application(applicationHandle);
  });

  afterEach(() => {
    sandbox.restore();
  });


  /** @test {Application#listPublicationPurposes} */
  describe("#listPublicationPurposes()", () => {
    const response = {
      "content": {}
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
    });

    it("should call get content-items from exhibition", () => {
      application.listPublicationPurposes({});

      sinon.assert.calledWithMatch(client.execute, {
        path: `/applications/${applicationHandle}/publication/purposes`
      });
    });
  });
});
