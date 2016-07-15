"use strict";

import chai from "chai";
import {fakeServerResponse} from "./test_utils.js";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";
import * as requests from "../src/requests";
import Tenant from "../src/tenant";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Me} */
describe("Me", () => {
  let sandbox, client, tenant, me;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    tenant = new Tenant(client, "example.com");
    me = tenant.users().me();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Me#get} */
  describe("#get", () => {
    beforeEach(()=> {
      sandbox.spy(requests, "me");
    });

    it("should execute expected request", () => {
      me.get();
      sinon.assert.calledWithMatch(requests.me);
    });
  });

  /** @test {Me#updateDisplayName} */
  describe("#updateDisplayName", () => {
    beforeEach(()=> {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "updateMyDisplayName");
    });

    it("should execute expected request", () => {
      me.updateDisplayName("newdisplayname");
      sinon.assert.calledWithMatch(requests.updateMyDisplayName, "newdisplayname");
    });
  });

  /** @test {Me#updateAvatarImage} */
  describe("#updateAvatarImage", () => {
    beforeEach(()=> {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "updateMyAvatarImage");
    });

    it("should execute expected request", () => {
      me.updateAvatarImage("pictureUri");
      sinon.assert.calledWithMatch(requests.updateMyAvatarImage, "pictureUri");
    });
  });
});
