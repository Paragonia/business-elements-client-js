"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {fakeServerResponse} from "../test_utils.js";
import sinon from "sinon";
import BusinessElementsClient from "../../src/index";

import * as requests from "../../src/requests";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Tenants} */
describe("Admin - Tenants", () => {
  let sandbox, client, tenants;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    tenants = client.admin().tenants();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Tenants#list} */
  describe("#list()", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
    });

    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be-admin:tenant" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should call tenants list url", () => {
      tenants.list({});

      sinon.assert.calledWithMatch(client.execute, {
        path: "/admin/tenants"
      });
    });

    it("should return the list of tenants", () => {
      return tenants.list({}).should.become(data);
    });
  });

  /** @test {Tenants#create} */
  describe("#create", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "createTenant");
    });

    const handle = "tenantHandle";
    const ownerEmailAddress = "ownerEmail@product-foundry.com";
    const name = "tenantName";

    it("should execute request", () => {
      tenants.create(handle, name, ownerEmailAddress, {});
      sinon.assert.calledWithMatch(requests.createTenant, handle, name, ownerEmailAddress);
    });

  });

});
