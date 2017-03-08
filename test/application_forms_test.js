"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";
import * as requests from "../src/requests";


chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Projects} */
describe("ApplicationForms", () => {
  let sandbox, client, applicationForms, applicationHandle, applicationFormHandle, applicationFormDescription;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    applicationHandle = "applicationHandle";
    applicationFormHandle = "applicationFormHandle";
    applicationFormDescription = "applicationFormDescription";
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

  /** @test {ApplicationForms#create} */
  describe("#create()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "createApplicationForm");
    });

    it("should create application form", () => {
      applicationForms.create(applicationFormHandle, applicationFormDescription, {});
      sinon.assert.calledWithMatch(requests.createApplicationForm, applicationHandle, applicationFormHandle, applicationFormDescription);
    });

    it("should return success", () => {
      return applicationForms.create(applicationFormHandle, applicationFormDescription, {}).should.eventually.become(response);
    });
  });


});
