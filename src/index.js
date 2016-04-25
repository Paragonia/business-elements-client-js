"use strict";

import "isomorphic-fetch";
import BusinessElementsClientBase from "./base";

export default class BusinessElementsClient extends BusinessElementsClientBase {
  constructor(remote, options={}) {
    super(remote, options);
  }
}
