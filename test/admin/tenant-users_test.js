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

/** @test {TenantUsers} */
describe("Admin - Tenant-Users", () => {
  let sandbox, client, accountId, tenantUsers;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    accountId = uuid.v4();
    tenantUsers = client.admin().accounts().account(accountId).users();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {TenantUsers#list} */
  describe("#list()", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
    });

    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be-admin:tenant_user" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should call users list url", () => {
      tenantUsers.list({});

      sinon.assert.calledWithMatch(client.execute, {
        path: `/admin/accounts/${accountId}/users`
      });
    });

    it("should return the list of users", () => {
      return tenantUsers.list({}).should.become(data);
    });
  });
});
