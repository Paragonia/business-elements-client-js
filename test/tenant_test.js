"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import BusinessElementsClient from "../src";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const FAKE_SERVER_URL = "http://api.fake-server";

/** @test {Tenant} */
describe("Tenant", () => {
  let sandbox, client, tenant;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    client = new BusinessElementsClient(FAKE_SERVER_URL);
    tenant = client.tenant("example.com");
  });

  afterEach(() => {
    sandbox.restore();
  });

  /** @test {Tenant#uploadOptions} */
  describe("#uploadOptions()", () => {

    it("should return uploadOptions", () => {
      const authenticationToken = "0000000000000000-0000000000000000-0000000000000000-0000000000000000";
      client.authenticationToken = authenticationToken;

      const options = tenant.uploadOptions();
      options.remote.should.equal(FAKE_SERVER_URL + "/upload");
      options.headers.tenant.should.equal("example.com");
      options.headers["Authentication-Token"].should.equal(authenticationToken);
    });
  });

  /** @test {Tenant#projects} */
  describe("#projects()", () => {

    it("should return projects", () => {
      return tenant.projects().should.exist;
    });
  });

  /** @test {Tenant#users} */
  describe("#users()", () => {

    it("should return users", () => {
      return tenant.users().should.exist;
    });
  });

  /** @test {BusinessElementsClient#getDownloadUri} */
  describe("#getDownloadUri()", () => {

    it("should return download uri without qualifier", () => {
      const resourceUri = "resource:image/jpeg,user-7f73ba30-1666-4afd-bb75-44a6f263dc08";
      const downloadUri = tenant.getDownloadUri(resourceUri);
      downloadUri.should.equal(`http://api.fake-server/download/${resourceUri}?Tenant=example.com`);
    });

    it("should return download uri with qualifier", () => {
      const resourceUri = "resource:image/jpeg,user-7f73ba30-1666-4afd-bb75-44a6f263dc08";
      const qualifier = "thumbnail";
      const downloadUri = tenant.getDownloadUri(resourceUri, qualifier);
      downloadUri.should.equal(`http://api.fake-server/download/${resourceUri}?qualifier=${qualifier}&Tenant=example.com`);
    });
  });
});
