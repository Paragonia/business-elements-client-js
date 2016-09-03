"use strict";

import endpoint from "./endpoint";
import Application from "./application";

/**
 * Abstract representation of Applications.
 */
export default class Applications {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant The tenant instance.
   */
  constructor(tenant) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;
  }

  /**
   * Retrieves the list of Applications in the current tenant.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("applications")}, options)
      // return empty string when response is missing certain fields to help client logic
      .then((response) => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:application"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve a value object to perform operations on it.
   *
   * @param  {String} id              The id of the application.
   * @return {Application}
   */
  application(applicationHandle) {
    return new Application(this.tenant, applicationHandle);
  }
}
