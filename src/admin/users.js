"use strict";

import endpoint from "../endpoint";

/**
 * Abstract representation of an admin users.
 */
export default class Users {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant
   */
  constructor(tenant) {

    /**
     * The admin tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;
  }

  /**
   * Retrieves the list of tenant users.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.admin.execute({path: endpoint("adminTenantUsers", this.tenant.id)}, options)
      .then((response) => {
        if (response && response["_embedded"]) {
          return response["_embedded"]["be-admin:user"];
        } else {
          return [];
        }
      });
  }
}
