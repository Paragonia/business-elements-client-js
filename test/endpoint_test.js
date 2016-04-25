import chai, { expect } from "chai";

import endpoint from "../src/endpoint";

chai.should();
chai.config.includeStack = true;

/** @test {endpoint} */
describe("endpoint()", () => {
  it("should provide a root endpoint", () => {
    expect(endpoint("root")).eql("/");
  });
});
