"use strict";

import endpoint from "./endpoint";
import Teams from "./teams";

/**
 * Abstract representation of a selected organization.
 */
export default class Organization {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant                The tenant instance.
   * @param  {String} organizationId        The organization id.
   */
  constructor(tenant, organizationId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The organization id.
     * @type {String}
     */
    this.organizationId = organizationId;
  }

  /**
   * Retrieves organization.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options={}) {
    return this.tenant.execute(
      {
        path: endpoint("organization", this.organizationId)
      },
      options
    );
  }

  /**
   * Provides access to project contexts.
   *
   * @return {Teams}
   */
  teams() {
    return new Teams(this.tenant, this);
  }
}
