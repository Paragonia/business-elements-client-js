"use strict";

import * as requests from "./requests";

export default class Tenants {

  /**
   * Constructor.
   *
   * @param  {BusinessElementsClient} client The client instance.
   */
  constructor(client) {
    /**
     * @ignore
     */
    this.client = client;
  }

  /**
   * Returns current tenant
   *
   * @param options
   * @returns {Promise.<Object, Error>}
   */
  currentTenant(options = {}) {
    return this.client.execute(requests.currentTenant(), options);
  }
}
