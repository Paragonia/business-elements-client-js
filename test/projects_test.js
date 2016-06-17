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
describe("Projects", () => {
  let sandbox, client, projects;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    projects = client.tenant("example.com").projects();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Projects#list} */
  describe("#list()", () => {
    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be:project" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should list tenant projects", () => {
      projects.list();

      sinon.assert.calledWithMatch(client.execute, {
        path: "/projects"
      });
    });

    it("should return the list of projects", () => {
      return projects.list().should.become(data);
    });
  });

});
