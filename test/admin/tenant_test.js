"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../../src/index";
import uuid from "uuid";

import * as requests from "../../src/requests";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Tenants} */
describe("Admin - Tenant", () => {
  let sandbox, client, tenant, tenantId;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    tenantId = uuid.v4();
    tenant = client.admin().tenants().tenant(tenantId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Tenant#edit} */
  describe("#edit()", () => {
    const tenantData = {
      id: "a",
      name: "tenant-name",
      handle: "tenant-handle",
      enabled: true
    };


    const tenantHandle = "tenant-handle";
    const addOwnerEmailAddresses = ["owner@test.nl"];
    const removeOwnerEmailAddresses = [];

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(tenantData));
      sandbox.spy(requests, "updateTenant");
    });

    it("should edit tenant", () => {
      tenant.edit(tenantHandle, addOwnerEmailAddresses, removeOwnerEmailAddresses);
      sinon.assert.calledWithMatch(requests.updateTenant, tenantId, tenantHandle, addOwnerEmailAddresses, removeOwnerEmailAddresses);
    });

    it("should return the updated tenant", () => {
      return tenant.edit(tenantHandle, addOwnerEmailAddresses, removeOwnerEmailAddresses).should.become(tenantData);
    });
  });

  /** @test {Tenant#toggleEnabled} */
  describe("#toggleEnabled()", () => {
    const enabledFlag = false;
    const tenantData = {
      id: "a",
      name: "tenant-name",
      handle: "tenant-handle",
      enabled: enabledFlag
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(tenantData));
    });

    it("should toggle tenant enabled flag", () => {
      tenant.toggleEnabled(enabledFlag);
      sinon.assert.calledWithMatch(client.execute, {
        path: `/admin/tenants/${tenantId}/enabled`,
        body: {
          enabled: enabledFlag
        }
      });
    });
  });
});
