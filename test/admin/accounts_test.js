"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {fakeServerResponse} from "../test_utils.js";
import sinon from "sinon";
import BusinessElementsClient from "../../src/index";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Accounts} */
describe("Admin - Accounts", () => {
  let sandbox, client, accounts;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    accounts = client.admin().accounts();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Accounts#list} */
  describe("#list()", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
    });

    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be-admin:account" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should call accounts list url", () => {
      accounts.list({});

      sinon.assert.calledWithMatch(client.execute, {
        path: "/admin/accounts"
      });
    });

    it("should return the list of accounts", () => {
      return accounts.list({}).should.become(data);
    });
  });
});
