"use strict";

import HTTP from "./http";
import endpoint from "./endpoint";
import * as requests from "./requests";
import Tenant from "./tenant";

/**
 * HTTP client for the Business Elements API.
 *
 * @example
 * const client = new BusinessElementsClient("https://api.business-elements.com");
 */
export default class BusinessElementsClientBase {

  /**
   * Constructor.
   *
   * @param  {String} remote  The remote URL.
   * @param  {Object}  options The options object.
   * @param  {Object}  options.headers     The key-value headers to pass to each request (default: `{}`).
   * @param  {String}  options.requestMode The HTTP request mode (from ES6 fetch spec).
   */
  constructor(remote, options={}) {

    this.remote = remote;

    /**
     * Default request options container.
     * @private
     * @type {Object}
     */
    this.defaultReqOptions = {
      headers: options.headers || {}
    };

    /**
     * The remote server base URL.
     * @ignore
     * @type {String}
     */
    this.remote = remote;

    /**
     * Current server information.
     * @ignore
     * @type {Object|null}
     */
    this.serverInfo = null;

    /**
     * Current authentication token.
     * @ignore
     * @type {String|null}
     */
    this.authenticationToken = null;

    /**
     * The HTTP instance.
     * @ignore
     * @type {HTTP}
     */
    this.http = new HTTP({requestMode: options.requestMode});
  }

  /**
   * The remote endpoint base URL.
   * @type {String}
   */
  get remote() {
    return this._remote;
  }

  /**
   * Sets the remote url. Trailing slashes will be removed.
   *
   * @param {String} url the remote url to set.
   */
  set remote(url) {
    if (typeof(url) !== "string" || !url.length) {
      throw new Error("Invalid remote URL: " + url);
    }

    this._remote = url;

    if (this._remote[this._remote.length - 1] === "/") {
      this._remote = this._remote.slice(0, -1);
    }
  }

  /**
   * Generates a request options object, deeply merging the client configured defaults with the ones provided as argument.
   *
   * Note: Headers won't be overridden but merged with instance default ones.
   *
   * @param    {Object} options The request options.
   * @return   {Object}
   * @property {Object} headers The extended headers object option.
   */
  getRequestOptions(options={}) {
    const requestOptions = {
      ...this.defaultReqOptions,
      ...options,
      // Note: headers should never be overridden but extended
      headers: {
        ...this.defaultReqOptions.headers,
        ...options.headers
      }
    };

    if (this.authenticationToken) {
      requestOptions.headers["Authentication-Token"] = this.authenticationToken;
    }

    return requestOptions;
  }

  /**
   * Retrieves server information and store locally. This operation is
   * usually performed a single time during the instance life cycle.
   *
   * @return {Promise<Object, Error>}
   */
  fetchServerInfo() {
    if (this.serverInfo) {
      return Promise.resolve(this.serverInfo);
    }
    return this.http.request(this.remote + endpoint("root"), {
      headers: this.defaultReqOptions.headers
    })
      .then(({json}) => {
        this.serverInfo = json;
        return this.serverInfo;
      });
  }

  /**
   * Retrieves Business elements server version.
   *
   * @return {Promise<String, Error>}
   */
  fetchServerVersion() {
    return this.fetchServerInfo().then(({platform}) => platform.version);
  }

  /**
   * Retrieves Business elements server build time.
   *
   * @return {Promise<Number, Error>}
   */
  fetchServerBuildTime() {
    return this.fetchServerInfo().then(({platform}) => platform.build.millis);
  }

  /**
   * Retrieves Business Elements server settings.
   *
   * @return {Promise<Object, Error>}
   */
  fetchServerSettings() {
    return this.fetchServerInfo().then(({settings}) => settings);
  }

  /**
   * Executes an atomic HTTP request.
   *
   * @private
   * @param  {Object}  request     The request object.
   * @param  {Object}  [options]   Optional options will be merged into the request, allowing the user to override any request option.
   * @param  {boolean} [raw]       Resolve with full response object, including json body and headers (Default: `false`, so only the json body is retrieved).
   * @return {Promise<Object, Error>}
   */
  execute(request, options = {}, raw = false) {

    const requestOptions = {
      ...request,
      body: JSON.stringify(request.body),
      ...options
    };

    const promise = this.http.request(`${this.remote}${request.path}`, requestOptions);

    return raw ? promise : promise.then(({json}) => json);
  }

  /**
   * Authenticates the account on the server.
   *
   * The generated authentication token is stored in the instance and will be send with each subsequent request.
   *
   * @param  {String}   emailAddress    The account email address.
   * @param  {String}   password        The account password.
   * @param  {Object}   options         The options object.
   * @return {Promise<String, Error>} With the authentication token.
   */
  login(emailAddress, password, options={}) {
    const reqOptions = this.getRequestOptions(options);
    return this.execute(requests.login(emailAddress, password, reqOptions), options, true)
      .then((response) => {
        this.authenticationToken = response.headers.get("Authentication-Token");
        return this.authenticationToken;
      });
  }

  /**
   * Logs out the account on the server.
   *
   * When the account is logged out the authentication token is invalidated.
   *
   * @param  {Object}   options         The options object.
   * @return {Promise<undefined, Error>}
   */
  logout(options={}) {
    const reqOptions = this.getRequestOptions(options);
    return this.execute(requests.logout(reqOptions));
  }

  /**
   * Retrieves the current authentication for the authenticated account.
   *
   * @param  {Object} options         The options object.
   * @param  {Object} options.headers The headers object option.
   * @return {Promise<Object[], Error>}
   */
  currentAuthentication(options={}) {
    const headers = this.getRequestOptions(options);
    return this
      .execute({
        path: endpoint("currentAuthentication"),
        headers: headers.headers
      })
      .then((response) => {
        return response;
      });
  }

  /**
   * Retrieve a tenant object to perform operations on it.
   *
   * @param  {String}  domainName    The tenant domain name.
   * @param  {Object}  options       The request options.
   * @return {Tenant}
   */
  tenant(domainName, options={}) {
    const tenantOptions = this.getRequestOptions(options);
    return new Tenant(this, domainName, tenantOptions);
  }
}
