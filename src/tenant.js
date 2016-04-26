import Users from "./users";

/**
 * Abstract representation of a selected tenant.
 *
 */
export default class Tenant {
  /**
   * Constructor.
   *
   * @param  {BusinessElementsClient} client     The client instance.
   * @param  {String}      domainName            The tenant domain name.
   * @param  {Object}      options.headers       The headers object option.
   */
  constructor(client, domainName, options={}) {
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
     * The default options object.
     * @ignore
     * @type {Object}
     */
    this.options = options;
  }

  /**
   * Merges passed request options with default tenant ones, if any.
   *
   * @private
   * @param  {Object} options The options to merge.
   * @return {Object}         The merged options.
   */
  _getTenantOptions(options={}) {
    const headers = {
      ...this.options && this.options.headers,
      ...options.headers,
      tenant: this.domainName
    };
    return {
      ...this.options,
      ...options,
      headers
    };
  }

  /**
   * Gets the resource for accessing users
   *
   * @param  {Object}   [options]       The options object.
   * @return {Users}
   */
  users(options={}) {
    return new Users(this.client, this._getTenantOptions(options));
  }
}
