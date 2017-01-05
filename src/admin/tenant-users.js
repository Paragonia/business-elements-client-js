"use strict";

import endpoint from "../endpoint";

/**
 * Abstract representation of tenant-users.
 */
export default class TenantUsers {

  /**
   * Constructor.
   *
   * @param  {Account} account
   */
  constructor(account) {

    /**
     * The admin account.
     * @type {Account}
     */
    this.account = account;
  }

  /**
   * Retrieves the list of tenant users.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.account.admin.execute({path: endpoint("adminAccountUsers", this.account.id)}, options)
      .then((response) => {
        if (response && response["_embedded"]) {
          return response["_embedded"]["be-admin:tenant_user"];
        } else {
          return [];
        }
      });
  }
}
