"use strict";

import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";
import uuid from "uuid";
import * as requests from "../src/requests";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {ProjectContext} */
describe("ProjectContext", () => {
  let sandbox, client, projectId, projectContext, contextId;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    projectId = uuid.v4();
    contextId = uuid.v4();
    projectContext = client.tenant("example.com").projects().project(projectId).contexts().context(contextId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {ProjectContext#interact} */
  describe("#interact()", () => {
    const response = {status: "Ok"};
    const textContent = "hello test";

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "sendInteraction");
    });

    it("should succeed with interaction of type text", () => {
      projectContext.interact(textContent);


      sinon.assert.calledWithMatch(client.execute, {
        path: `/interactions/contexts/${contextId}`,
        method: "POST",
        body: {content: {data: {text: "hello test"}, type: "TextContent"}}
      });
    });

    it("should validate interaction content type is a string", () => {
      expect(() => projectContext.interact({})).to.Throw(Error, /Text is required and needs to be of type String/);
    });

    it("should validate interaction content type to be not null", () => {
      expect(() => projectContext.interact(null)).to.Throw(Error, /Text is required and needs to be of type String/);
    });

  });

});
