"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Projects} */
describe("ApplicationForms", () => {
  let sandbox, client, applicationForms, applicationHandle;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    applicationHandle = "applicationHandle";
    applicationForms = client.tenant("example.com").applications().application(applicationHandle).forms();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {ApplicationForms#list} */
  describe("#list()", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded": {
        "be:application_form": data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should list application forms", () => {
      applicationForms.list();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/applications/${applicationHandle}/forms`
      });
    });

    it("should return the list of forms", () => {
      return applicationForms.list().should.become(data);
    });
  });

});
