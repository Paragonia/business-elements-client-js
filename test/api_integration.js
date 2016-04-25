"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";

import Api from "../src";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const TEST_BUSINESS_ELEMENTS_SERVER = "http://api.business-elements.com";

describe("Integration tests", function() {
  let sandbox, api;

  this.timeout(12500);

  function createClient(options={}) {
    return new Api(TEST_BUSINESS_ELEMENTS_SERVER, options);
  }

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    api = createClient();
  });

  afterEach(() => sandbox.restore());

  describe("Default server configuration", () => {

    describe("Server properties", () => {
      it("should retrieve server settings", () => {
        return api.fetchServerVersion()
          .should.eventually.become("0.0.1-SNAPSHOT");
      });
    });
  });
});
