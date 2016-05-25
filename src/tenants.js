"use strict";

import * as requests from "./requests";

export default class Tenants {

  /**
   * Constructor.
   *
   * @param  {BusinessElementsClient} client     The client instance.
   * @param  {Object}      options.headers       The headers object option.
   */
  constructor(client, options = {}) {
    /**
     * @ignore
     */
    this.client = client;

    /**
     * The default options object.
     * @ignore
     * @type {Object}
     */
    this.options = options;
  }


  /**
   * Merges passed request options with default tenant ones, if any.
   *
   * @private
   * @param  {Object} options The options to merge.
   * @return {Object}         The merged options.
   */
  _getTenantOptions(options = {}) {
    const headers = {
      ...this.options && this.options.headers,
      ...options.headers
    };
    return {
      ...this.options,
      ...options,
      headers
    };
  }

  /**
   * Returns current tenant
   *
   * @param options
   * @returns {Promise.<Object, Error>}
   */
  currentTenant(options = {}) {
    const reqOptions = this._getTenantOptions(options);
    return this.client.execute(requests.currentTenant(reqOptions), false);
  }

}
