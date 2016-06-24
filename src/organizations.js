"use strict";

import endpoint from "./endpoint";
import Organization from "./organization";
import * as requests from "./requests";

/**
 * Abstract representation of organizations.
 */
export default class Organizations {

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
   * Retrieves the list of organizations in the current tenant.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("organizations")}, options)
      // return empty string when response is missing certain fields to help client logic
      .then((response) => {
        if (response && response["_embedded"]) {
          return response["_embedded"]["be:organization"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve an organization object to perform operations on it.
   *
   * @param  {String} id              The id of the organization.
   * @return {Organization}
   */
  organization(id) {
    return new Organization(this.tenant, id);
  }

  /**
   * Creates the organization with the specified properties.
   *
   * @param  {String}  name           The name of the organization.
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  create(name, options = {}) {
    return this.tenant.execute(
      requests.createOrganization(name),
      options
    );
  }
}
