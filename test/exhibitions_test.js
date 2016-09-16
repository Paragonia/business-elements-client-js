"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {fakeServerResponse} from "./test_utils.js";
import sinon from "sinon";
import uuid from "uuid";
import BusinessElementsClient from "../src";

import * as requests from "../src/requests";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Exhibitions} */
describe("Exhibitions", () => {
  let sandbox, client, exhibitions;
  const projectId = uuid.v4();

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    exhibitions = client.tenant("example.com").exhibitions();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Exhibitions#list} */
  describe("#list()", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
    });

    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be:exhibition" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should call exhibitions list url", () => {
      exhibitions.list({});

      sinon.assert.calledWithMatch(client.execute, {
        path: "/exhibitions"
      });
    });

    it("should return the list of exhibitions", () => {
      return exhibitions.list({}).should.become(data);
    });
  });

  /** @test {Exhibitions#listPublic} */
  describe("#listPublic()", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
    });

    const data = [{id: "a"}, {id: "b"}];
    const actual = {
      "_embedded" : {
        "be:exhibition_instances" : data
      }
    };

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(actual));
    });

    it("should call exhibitions list public url", () => {
      exhibitions.listPublic({});

      sinon.assert.calledWithMatch(client.execute, {
        path: "/exhibitions/public"
      });
    });

    it("should return the list of exhibitions", () => {
      return exhibitions.listPublic({}).should.become(data);
    });
  });

  /** @test {Exhibitions#create} */
  describe("#create", () => {
    beforeEach(() => {
      sandbox.stub(root, "fetch").returns(fakeServerResponse(201, {}, {}));
      sandbox.spy(requests, "createExhibition");
    });

    const name = "exhibition name";
    const description = "description";
    const pictureUri = "pictureUri";

    it("should execute request", () => {
      exhibitions.create(projectId, name, description, pictureUri, {});
      sinon.assert.calledWithMatch(requests.createExhibition, projectId, name, description, pictureUri);
    });

  });

});
