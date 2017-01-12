"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {fakeServerResponse} from "../test_utils.js";
import sinon from "sinon";
import uuid from "uuid";
import BusinessElementsClient from "../../src/index";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {TenantFeatures} */
describe("Admin - Tenant-Features", () => {
  let sandbox, client, tenantId, tenantFeatures;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    tenantId = uuid.v4();
    tenantFeatures = client.admin().tenants().tenant(tenantId).features();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {TenantFeatures#list} */
  describe("#list()", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
    });

    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be-admin:tenant_feature" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should call users list url", () => {
      tenantFeatures.list({});

      sinon.assert.calledWithMatch(client.execute, {
        path: `/admin/tenants/${tenantId}/features`
      });
    });

    it("should return the list of users", () => {
      return tenantFeatures.list({}).should.become(data);
    });
  });

  /** @test {TenantFeatures#toggle} */
  describe("#toggle()", () => {
    const feature = "feature";
    const toggleValue = "on";
    const tenantData = {
      id: "tenantId"
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(tenantData));
    });

    it("should set tenant feature", () => {
      tenantFeatures.toggle(feature, toggleValue);
      sinon.assert.calledWithMatch(client.execute, {
        method: "PUT",
        path: `/admin/tenants/${tenantId}/feature`,
        body: {
          name: feature,
          value: toggleValue
        }
      });
    });
  });
});
