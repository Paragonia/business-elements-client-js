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

/** @test {Tenants} */
describe("Admin - Users", () => {
  let sandbox, client, tenantId, users;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    tenantId = uuid.v4();
    users = client.admin().tenants().tenant(tenantId).users();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Users#list} */
  describe("#list()", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
    });

    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be-admin:user" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should call users list url", () => {
      users.list({});

      sinon.assert.calledWithMatch(client.execute, {
        path: `/admin/tenants/${tenantId}/users`
      });
    });

    it("should return the list of users", () => {
      return users.list({}).should.become(data);
    });
  });
});
