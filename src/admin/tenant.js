"use strict";

import Users from "./users";

/**
 * Abstract representation of an admin tenant.
 */
export default class Tenant {

  /**
   * Constructor.
   *
   * @param  {Admin} admin The admin instance.
   */
  constructor(admin, tenantId) {

    /**
     * The admin.
     * @type {Tenant}
     */
    this.admin = admin;

    /**
     * The tenantId.
     * @type {string}
     */
    this.id = tenantId;
  }

  users() {
    return new Users(this);
  }
}
