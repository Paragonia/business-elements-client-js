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

/** @test {Attribute} */
describe("ApplicationForm", () => {
  let sandbox, client, applicationHandle, applicationFormHandle, conceptId, attributeId, applicationForm;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    conceptId = uuid.v4();
    attributeId = uuid.v4();
    applicationHandle = "applicationHandle";
    applicationFormHandle = "applicationFormHandle";
    applicationForm = client.tenant("example.com").applications().application(applicationHandle).forms().form(applicationFormHandle);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {ApplicationForm#get} */
  describe("#get()", () => {
    const data = {handle: applicationFormHandle};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get application form", () => {
      applicationForm.get();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/applications/${applicationHandle}/forms/${applicationFormHandle}`
      });
    });

    it("should return application form data", () => {
      return applicationForm.get().should.become(data);
    });
  });

  /** @test {ApplicationForm#createConceptForm} */
  describe("#createConceptForm()", () => {
    const response = {status: "Ok"};
    const form = {
      "key": "name",
      "type": "text"
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "createApplicationConceptForm");
    });

    it("should create application concept form", () => {
      applicationForm.createConceptForm(conceptId, form, {});
      sinon.assert.calledWithMatch(requests.createApplicationConceptForm, applicationHandle, conceptId, applicationFormHandle, form);
    });

    it("should return success", () => {
      return applicationForm.createConceptForm(conceptId, form, {}).should.eventually.become(response);
    });
  });

  /** @test {ApplicationForm#updateConceptForm} */
  describe("#updateConceptForm()", () => {
    const response = {status: "Ok"};
    const form = {
      "key": "name",
      "type": "text"
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "updateApplicationConceptForm");
    });

    it("should update application concept form", () => {
      applicationForm.updateConceptForm(conceptId, form, {});
      sinon.assert.calledWithMatch(requests.updateApplicationConceptForm, applicationHandle, conceptId, applicationFormHandle, form);
    });

    it("should return success", () => {
      return applicationForm.updateConceptForm(conceptId, form, {}).should.eventually.become(response);
    });
  });

  /** @test {ApplicationForm#createAttributeForm} */
  describe("#createAttributeForm()", () => {
    const response = {status: "Ok"};
    const form = {
      "key": "name",
      "type": "text"
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "createApplicationAttributeForm");
    });

    it("should create application attribute form", () => {
      applicationForm.createAttributeForm(attributeId, form, {});
      sinon.assert.calledWithMatch(requests.createApplicationAttributeForm, applicationHandle, attributeId, applicationFormHandle, form);
    });

    it("should return success", () => {
      return applicationForm.createAttributeForm(attributeId, form, {}).should.eventually.become(response);
    });
  });

  /** @test {ApplicationForm#updateAttributeForm} */
  describe("#updateAttributeForm()", () => {
    const response = {status: "Ok"};
    const form = {
      "key": "name",
      "type": "text"
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "updateApplicationAttributeForm");
    });

    it("should update application attribute form", () => {
      applicationForm.updateAttributeForm(attributeId, form, {});
      sinon.assert.calledWithMatch(requests.updateApplicationAttributeForm, applicationHandle, attributeId, applicationFormHandle, form);
    });

    it("should return success", () => {
      return applicationForm.updateAttributeForm(attributeId, form, {}).should.eventually.become(response);
    });
  });

});
