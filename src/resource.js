"use strict";

import endpoint from "./endpoint";

/**
 * Abstract representation of a resource.
 */
export default class Resource {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant     The tenant instance.
   * @param  {String} resourceId  The resource id.
   */
  constructor(tenant, resourceId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The resource id.
     * @type {String}
     */
    this.resourceId = resourceId;
  }

  /**
   * Retrieves resource.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("resource", this.resourceId)
      },
      options
    );
  }
}
