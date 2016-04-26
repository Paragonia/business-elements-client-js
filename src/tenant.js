import * as requests from "./requests";

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
   * Checks if the given email address is available to be used for creating a user.
   *
   * @param  {String}   emailAddress    The email address to check.
   * @param  {Object}   options         The options object.
   * @return {Promise<Boolean, Error>}  Indicating if the user email is available.
   */
  isEmailAvailable(emailAddress, options = {}) {
    const headers = this._getTenantOptions(options);
    return this.client
      .execute(requests.isEmailAvailable(emailAddress, headers))
      .then((response) => {
        return true;
      })
      .catch ((error) => {
        return false;
      });
  }
}
