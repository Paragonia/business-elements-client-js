"use strict";

import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import { fakeServerResponse } from "./test_utils.js";
import HTTP from "../src/http.js";

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

const root = typeof window === "object" ? window : global;

/** @test {HTTP} */
describe("HTTP class", () => {
  let sandbox, http;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    http = new HTTP({timeout: 100});
  });

  afterEach(() => sandbox.restore());

  /** @test {HTTP#constructor} */
  describe("#constructor", () => {
    it("should accept a requestMode option", () => {
      expect(new HTTP({requestMode: "no-cors"}).requestMode).eql("no-cors");
    });
  });

  /** @test {HTTP#request} */
  describe("#request()", () => {
    describe("Request headers", () => {
      beforeEach(() => {
        sandbox.stub(root, "fetch").returns(fakeServerResponse(200, {}, {}));
      });

      it("should set default headers", () => {
        http.request("/");

        expect(fetch.firstCall.args[1].headers).eql(HTTP.DEFAULT_REQUEST_HEADERS);
      });

      it("should merge custom headers with default ones", () => {
        http.request("/", {headers: {Foo: "Bar"}});

        expect(fetch.firstCall.args[1].headers.Foo).eql("Bar");
      });
    });

    describe("Request CORS mode", () => {
      beforeEach(() => {
        sandbox.stub(root, "fetch").returns(fakeServerResponse(200, {}, {}));
      });

      it("should use default CORS mode", () => {
        new HTTP().request("/");

        expect(fetch.firstCall.args[1].mode).eql("cors");
      });

      it("should use configured custom CORS mode", () => {
        new HTTP({requestMode: "no-cors"}).request("/");

        expect(fetch.firstCall.args[1].mode).eql("no-cors");
      });
    });

    describe("Successful request", () => {
      beforeEach(() => {
        sandbox.stub(root, "fetch").returns(
          fakeServerResponse(200, {a: 1}, {b: 2}));
      });

      it("should resolve with HTTP status", () => {
        return http.request("/")
          .then(res => res.status)
          .should.eventually.become(200);
      });

      it("should resolve with JSON body", () => {
        return http.request("/")
          .then(res => res.json)
          .should.eventually.become({a: 1});
      });

      it("should resolve with headers", () => {
        return http.request("/")
          .then(res => res.headers.get("b"))
          .should.eventually.become(2);
      });
    });

    describe("Request timeout", () => {
      it("should timeout the request", () => {
        sandbox.stub(root, "fetch").returns(
          new Promise(resolve => {
            setTimeout(resolve, 20000);
          }));
        return http.request("/")
          .should.eventually.be.rejectedWith(Error, /timeout/);
      });
    });

    describe("No content response", () => {
      it("should resolve with null JSON if Content-Length header is missing", () => {
        sandbox.stub(root, "fetch").returns(
          fakeServerResponse(200, null, {}));

        return http.request("/")
          .then(res => res.json)
          .should.eventually.become(null);
      });
    });

    describe("Malformed JSON response", () => {
      xit("should reject with an appropriate message", () => {
        sandbox.stub(root, "fetch").returns(Promise.resolve({
          status: 200,
          headers: {
            get(name) {
              if (name !== "Alert") {
                return "fake";
              }
            }
          },
          text() {
            return "invalid JSON";
          }
        }));

        return http.request("/")
          .should.be.rejectedWith(Error, /HTTP 200; SyntaxError: Unexpected token/);
      });
    });
  });
});
