"use strict";

import Tenants from "./tenants";

/**
 * Deals with administrator related task on
 */
export default class Admin {
  /**
   * Constructor.
   *
   * @param  {BusinessElementsClientBase} client The client instance.
   */
  constructor(client) {
    /**
     * @ignore
     */
    this.client = client;
  }

  /**
   * Executes an atomic HTTP request for a tenant.
   *
   * This will delegate to the client with all tenant options merged.
   *
   * @param  {Object}  request     The request object.
   * @param  {Object}  options     Optional options will be merged into the request, allowing the user to override any request option.
   * @param  {boolean} [raw]       Resolve with full response object, including json body and headers (Default: `false`, so only the json body is retrieved).
   * @return {Promise<Object, Error>}
   */
  execute(request, options, raw = false) {
    return this.client.execute(request, options, raw);
  }

  tenants() {
    return new Tenants(this);
  }
}
