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

/** @test {Exhibition} */
describe("Exhibition", () => {
  let sandbox, client, exhibitionId, exhibition;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    exhibitionId = uuid.v4();

    exhibition = client.tenant("example.com").exhibitions().exhibition(exhibitionId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Exhibition#get} */
  describe("#get()", () => {
    const data = {id: exhibitionId};

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(data));
    });

    it("should get exhibition", () => {
      exhibition.get();

      sinon.assert.calledWithMatch(client.execute, {
        path: `/exhibitions/${exhibitionId}`
      });
    });

    it("should return exhibition data", () => {
      return exhibition.get().should.become(data);
    });
  });

  /** @test {Exhibition#remove} */
  describe("#remove()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "deleteExhibition");
    });

    it("should delete the exhibition", () => {
      exhibition.remove({});

      sinon.assert.calledWithMatch(requests.deleteExhibition, exhibitionId);
    });

    it("should return success", () => {
      return exhibition.remove({}).should.eventually.become(response);
    });
  });

  /** @test {Exhibition#changeExhibitionVisibility} */
  describe("#changeExhibitionVisibility()", () => {
    const response = {status: "Ok"};

    const visibility = "public";

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "changeExhibitionVisibility");
    });

    it("should change visibility of the exhibition", () => {
      exhibition.changeExhibitionVisibility(visibility, {});

      sinon.assert.calledWithMatch(requests.changeExhibitionVisibility, exhibitionId, visibility);
    });

    it("should return success", () => {
      return exhibition.changeExhibitionVisibility(visibility, {}).should.eventually.become(response);
    });
  });

  /** @test {Exhibition#update} */
  describe("#update()", () => {
    const response = {status: "Ok"};

    const name = "exhibition name";
    const description = "exhibition description";
    const pictureUri = "exhibition pictureUri";

    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "updateExhibition");
    });

    it("should update the exhibition", () => {
      exhibition.update(name, description, pictureUri, {});

      sinon.assert.calledWithMatch(requests.updateExhibition, exhibitionId, name, description, pictureUri);
    });

    it("should return success", () => {
      return exhibition.update(name, description, pictureUri, {}).should.eventually.become(response);
    });
  });
});
