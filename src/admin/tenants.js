"use strict";

import endpoint from "../endpoint";
import Tenant from "./tenant";
import * as requests from "../requests";

/**
 * Abstract representation of organizations.
 */
export default class Tenants {

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
   * Retrieves the list of tenants.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.admin.execute({path: endpoint("adminTenants")}, options)
      .then((response) => {
        if (response && response["_embedded"]) {
          return response["_embedded"]["be-admin:tenant"];
        } else {
          return [];
        }
      });
  }

  /**
   * Creates the organization with the specified properties.
   *
   * @param  {String}  handle             The handle of the tenant.
   * @param  {String}  name               The name of the tenant.
   * @param  {String}  ownerEmailAddress  The emailaddress of owner of the tenant.
   * @param  {Object} options             The options object.
   * @return {Promise<Object, Error>}
   */
  create(handle, name, ownerEmailAddress, options = {}) {
    return this.admin.execute(
      requests.createTenant(handle, name, ownerEmailAddress),
      options
    );
  }

  /**
   * Retrieve a tenant object to perform operations on it.
   *
   * @param  {String} id The id of the tenant.
   * @return {Tenant}
   */
  tenant(id) {
    return new Tenant(this.admin, id);
  }
}
