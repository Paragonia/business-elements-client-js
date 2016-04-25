"use strict";

import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";

import Api from "../src";
import { delayedPromise } from "./test_utils";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const TEST_BUSINESS_ELEMENTS_SERVER = "http://api.business-elements.com";

describe("Integration tests", function() {
  let sandbox, server, api;

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
