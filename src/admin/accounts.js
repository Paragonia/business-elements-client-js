"use strict";

import endpoint from "../endpoint";
import Account from "./account";
import * as requests from "../requests";

/**
 * Abstract representation of accounts.
 */
export default class Accounts {

  /**
   * Constructor.
   *
   * @param  {Admin} admin The admin instance.
   */
  constructor(admin) {

    /**
     * The admin.
     * @type {Tenant}
     */
    this.admin = admin;
  }

  /**
   * Retrieves the list of accounts.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.admin.execute({path: endpoint("adminAccounts")}, options)
      .then((response) => {
        if (response && response["_embedded"]) {
          return response["_embedded"]["be-admin:account"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve a {Account} object to perform operations on it.
   *
   * @param  {String} id The id of the tenant.
   * @return {Account}
   */
  account(id) {
    return new Account(this.admin, id);
  }
}
