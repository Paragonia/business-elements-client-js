"use strict";

import endpoint from "./endpoint";

/**
 * Abstract representation of an organization.
 *
 */
export default class Organization {

  /**
   * Constructor.
   *
   * @param  {BusinessElementsClient} client     The client instance.
   * @param  {String}      organizationId        The organization id.
   * @param  {Object}      options.headers       The headers object option.
   */
  constructor(client, organizationId, options={}) {
    /**
     * @ignore
     */
    this.client = client;

    /**
     * The organization id.
     * @type {String}
     */
    this.organizationId = organizationId;

    /**
     * The default options object.
     * @ignore
     * @type {Object}
     */
    this.options = options;

  }

  /**
   * Merges passed request options with default organization ones, if any.
   *
   * @private
   * @param  {Object} options The options to merge.
   * @return {Object}         The merged options.
   */
  _getOrganizationOptions(options={}) {
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
   * Retrieves organization.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options={}) {
    return this.client.execute({
      path: endpoint("organization", this.organizationId),
      ...this._getOrganizationOptions(options)
    });
  }
}
