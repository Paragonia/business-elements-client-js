import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";
import * as requests from "../src/requests";
import uuid from "uuid";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Relation} */
describe("Relation", () => {
  let sandbox, client, relationId, relation, conceptId;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    relationId = uuid.v4();
    conceptId = uuid.v4();
    relation = client.tenant("example.com").concepts().relations().relation(relationId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Relation#specifyRelationCategory} */
  describe("#specifyRelationCategory()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "specifyRelationCategory");
    });

    it("should edit the relation category", () => {
      relation.specifyRelationCategory("Association", {});

      sinon.assert.calledWithMatch(requests.specifyRelationCategory, relationId, "Association");
    });

    it("should return success", () => {
      return relation.specifyRelationCategory("Association", {}).should.eventually.become(response);
    });
  });

  /** @test {Relation#specifyRelationSubjectCriteria} */
  describe("#specifyRelationSubjectCriteria()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "specifyRelationSubjectCriteria");
    });

    it("should edit the relation subject", () => {
      relation.specifyRelationSubjectCriteria({argumentType: "Instance"}, {});

      sinon.assert.calledWithMatch(requests.specifyRelationSubjectCriteria, relationId, {argumentType: "Instance"});
    });

    it("should return success", () => {
      return relation.specifyRelationSubjectCriteria({argumentType: "Instance"}, {}).should.eventually.become(response);
    });
  });

  /** @test {Relation#specifyRelationObjectCriteria} */
  describe("#specifyRelationObjectCriteria()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "specifyRelationObjectCriteria");
    });

    it("should edit the relation object", () => {
      relation.specifyRelationObjectCriteria({conceptId: conceptId, argumentType: "Instance"}, {});

      sinon.assert.calledWithMatch(requests.specifyRelationObjectCriteria, relationId, {conceptId: conceptId, argumentType: "Instance"});
    });

    it("should return success", () => {
      return relation.specifyRelationObjectCriteria({conceptId: conceptId, argumentType: "Instance"}, {}).should.eventually.become(response);
    });
  });

  /** @test {Relation#specifyRelationDirection} */
  describe("#specifyRelationDirection()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "specifyRelationDirection");
    });

    it("should edit the relation direction", () => {
      relation.specifyRelationDirection({type: "BiDirectional"}, {});

      sinon.assert.calledWithMatch(requests.specifyRelationDirection, relationId, {type: "BiDirectional"});
    });

    it("should return success", () => {
      return relation.specifyRelationDirection({type: "BiDirectional"}, {}).should.eventually.become(response);
    });
  });

  /** @test {Relation#deleteRelationSpecification} */
  describe("#deleteRelationSpecification()", () => {
    const response = {status: "Ok"};
    beforeEach(() => {
      sandbox.stub(client, "execute").returns(Promise.resolve(response));
      sandbox.spy(requests, "deleteRelationSpecification");
    });

    it("should delete the relation ", () => {
      relation.deleteRelationSpecification({});

      sinon.assert.calledWithMatch(requests.deleteRelationSpecification, relationId);
    });

    it("should return success", () => {
      return relation.deleteRelationSpecification({}).should.eventually.become(response);
    });
  });
});
