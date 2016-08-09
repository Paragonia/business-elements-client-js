"use strict";

import endpoint from "./endpoint";
import Resource from "./resource";

/**
 * Abstract representation of Resources.
 */
export default class Resources {

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
   * Retrieves the list of Resources in the current tenant.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("resources")}, options)
      // return empty string when response is missing certain fields to help client logic
      .then((response) => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:user_resource"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve a Resource object to perform operations on it.
   *
   * @param  {String} userResourceId The id of user the resource.
   * @return {Resource}
   */
  resource(userResourceId) {
    return new Resource(this.tenant, userResourceId);
  }
}
