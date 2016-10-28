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

/** @test {Bout} */
describe("Bout", () => {

  let sandbox, client, boutId, bout;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    boutId = uuid.v4();
    bout = client.tenant("example.com").bouts().bout(boutId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Bout#remove} */
  describe("#remove()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "deleteBout");
    });

    it("should delete the bout", () => {
      bout.remove({});

      sinon.assert.calledWithMatch(requests.deleteBout, boutId);
    });

    it("should return success", () => {
      return bout.remove({}).should.eventually.become(response);
    });
  });
});
