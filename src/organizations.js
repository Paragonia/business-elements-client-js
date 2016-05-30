"use strict";

import endpoint from "./endpoint";
import Organization from "./organization";
import * as requests from "./requests";

/**
 * Abstract representation of a selected tenant.
 *
 */
export default class Organizations {
  /**
   * Constructor.
   *
   * @param  {BusinessElementsClient} client     The client instance.
   * @param  {Object}      options.headers       The headers object option.
   */
  constructor(client, options={}) {
    /**
     * @ignore
     */
    this.client = client;

    /**
     * The default options object.
     * @ignore
     * @type {Object}
     */
    this.options = options;
  }

  /**
   * Merges passed request options with default users ones.
   *
   * @private
   * @param  {Object} options The options to merge.
   * @return {Object}         The merged options.
   */
  _getOrganizationsOptions(options={}) {
    const headers = {
      ...this.options && this.options.headers,
      ...options.headers
    };
    return {
      ...this.options,
      ...options,
      headers
    };
  }

  /**
   * Retrieves the list of organizations in the current tenant.
   *
   * @param  {Object} options         The options object.
   * @param  {Object} options.headers The headers object option.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options={}) {
    return this.client.execute({
      path: endpoint("organizations"),
      ...this._getOrganizationsOptions(options)
    });
  }

  /**
   * Retreive an organization object to perform operations on it.
   *
   * @param  {String} id              The id of the organization.
   * @param  {Object} options         The options object.
   * @return {Organization}
   */
  organization(id, options) {
    return new Organization(this.client, id, this._getOrganizationsOptions(options));
  }

  /**
   * Creates the organization with the specified properties.
   *
   * @param  {String}   name     The name of the organization.
   * @return {Promise<Object, Error>}
   */
  create(name, options = {}) {
    const reqOptions = this._getOrganizationsOptions(options);
    return this.client
      .execute(requests.createOrganization(name, reqOptions));
  }
}
