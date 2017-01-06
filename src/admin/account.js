"use strict";

import TenantUsers from "./tenant-users";

/**
 * Abstract representation of an admin account.
 */
export default class Account {

  /**
   * Constructor.
   *
   * @param  {Admin} admin The admin instance.
   * @param  {String} accountId The id of the {Account}.
   */
  constructor(admin, accountId) {

    /**
     * The admin.
     * @type {Tenant}
     */
    this.admin = admin;

    /**
     * The tenantId.
     * @type {String}
     */
    this.id = accountId;
  }

  users() {
    return new TenantUsers(this);
  }
}
