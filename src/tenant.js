"use strict";

import Attributes from "./attributes";
import Captures from "./captures";
import Organizations from "./organizations";
import Projects from "./projects";
import Users from "./users";
import UploadOptions from "./upload-options";
import endpoint from "./endpoint";

/**
 * Abstract representation of a selected tenant.
 */
export default class Tenant {
  /**
   * Constructor.
   *
   * @param  {BusinessElementsClientBase} client The client instance.
   * @param  {String}      domainName            The tenant domain name.
   */
  constructor(client, domainName) {
    /**
     * @ignore
     */
    this.client = client;

    /**
     * The tenant domain name.
     * @type {String}
     */
    this.domainName = domainName;

    /**
     * Options that need to be added for every tenant request
     * @private
     * @type {Object}
     */
    this._tenantOptions = {
      headers: {
        tenant: this.domainName
      }
    };
  }

  /**
   * Merges passed options with tenant options.
   *
   * @param  {Object} options The options to merge.
   * @return {Object}         The merged options.
   */
  createTenantOptions(options={}) {
    return {
      ...this._tenantOptions,
      ...options,
      headers: {
        ...this._tenantOptions.headers,
        ...options.headers
      }
    };
  }

  /**
   * Executes an atomic HTTP request for a tenant.
   *
   * This will delegate to the client with all tenant options merged.
   *
   * @param  {Object}  request     The request object.
   * @param  {Object}  options     Optional options will be merged into the request, allowing the user to override any request option.
   * @param  {boolean} [raw]       Resolve with full response object, including json body and headers (Default: `false`, so only the json body is retrieved).
   * @return {Promise<Object, Error>}
   */
  execute(request, options, raw = false) {
    return this.client.execute(request, this.createTenantOptions(options), raw);
  }

  /**
   * Provides access to tenant attributes.
   *
   * @returns {Attributes}
   */
  attributes() {
    return new Attributes(this);
  }

  /**
   * Provides access to tenant organizations.
   *
   * @return {Organizations}
   */
  organizations() {
    return new Organizations(this);
  }

  /**
   * Provides access to tenant projects.
   *
   * @return {Projects}
   */
  projects() {
    return new Projects(this);
  }

  /**
   * Provides access to tenant users.
   *
   * @return {Users}
   */
  users() {
    return new Users(this);
  }

  /**
   * Provides access to tenant captures.
   *
   * @return {Captures}
   */
  captures() {
    return new Captures(this);
  }

  /**
   * Provides access to upload options because details are often required by other libraries.
   *
   * @return {UploadOptions}
   */
  uploadOptions() {
    return new UploadOptions({
      remote: this.client.remote + endpoint("upload"),
      headers: {
        ...this.createTenantOptions().headers,
        ...this.client.getRequestOptions().headers
      }
    });
  }
}
