"use strict";

import HTTP from "./http";
import endpoint from "./endpoint";
import * as requests from "./requests";

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
   * @param  {String}  options.tenant      The default tenant to use (default: `"default"`)
   * @param  {String}  options.requestMode The HTTP request mode (from ES6 fetch spec).
   */
  constructor(remote, options={}) {
    if (typeof(remote) !== "string" || !remote.length) {
      throw new Error("Invalid remote URL: " + remote);
    }
    if (remote[remote.length-1] === "/") {
      remote = remote.slice(0, -1);
    }

    /**
     * Default request options container.
     * @private
     * @type {Object}
     */
    this.defaultReqOptions = {
      headers: options.headers || {}
    };

    this._options = options;

    /**
     * The remote server base URL.
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
   * @ignore
   */
  set remote(url) {
    this._remote = url;
  }

  /**
   * Generates a request options object, deeply merging the client configured defaults with the ones provided as argument.
   *
   * Note: Headers won't be overridden but merged with instance default ones.
   *
   * @private
   * @param    {Object} options The request options.
   * @return   {Object}
   * @property {Object} headers The extended headers object option.
   */
  _getRequestOptions(options={}) {
    const requestOptions = {
      ...this.defaultReqOptions,
      ...options,
      // Note: headers should never be overridden but extended
      headers: {
        ...this.defaultReqOptions.headers,
        ...options.headers
      },
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
    return this.fetchServerInfo().then(({version}) => version);
  }

  /**
   * Retrieves Business elements server build time.
   *
   * @return {Promise<String, Error>}
   */
  fetchServerBuildTime() {
    return this.fetchServerInfo().then(({build}) => build);
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
   * @param  {Object}  options     The options object.
   * @param  {Boolean} options.raw Resolve with full response object, including json body and headers (Default: `false`, so only the json body is retrieved).
   * @return {Promise<Object, Error>}
   */
  execute(request, options={raw: false}) {
    const promise = this.fetchServerSettings()
      .then(_ => {
        return this.http.request(this.remote + request.path, {
          ...request,
          body: JSON.stringify(request.body)
        });
      });
    return options.raw ? promise : promise.then(({json}) => json);
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
    const reqOptions = this._getRequestOptions(options);
    return this.execute(requests.login(emailAddress, password, reqOptions), {raw:true})
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
    const reqOptions = this._getRequestOptions(options);
    return this.execute(requests.logout(reqOptions))
      .then((response) => {
        this.authenticationToken = null;
      });
  }

  /**
   * Retrieves the current authentication for the authenticated account.
   *
   * @param  {Object} options         The options object.
   * @param  {Object} options.headers The headers object option.
   * @return {Promise<Object[], Error>}
   */
  currentAuthentication(options={}) {
    const headers = this._getRequestOptions(options);
    return this
      .execute({
        path: endpoint("authentication"),
        headers: headers.headers
      })
      .then((response) => {
        return response;
      });
  }

  /**
   * Checks if the given email address is available to be used for creating an account.
   *
   * @param  {String}   emailAddress    The account email address.
   * @param  {Object}   options         The options object.
   * @return {Promise<Boolean, Error>} With the availability status
   */
  isEmailAvailable(emailAddress, options = {}) {
    const headers = this._getRequestOptions(options);
    return this
      .execute(requests.isEmailAvailable(emailAddress, headers), {raw: true})
      .then((response) => {
        return (response.status === 202);
      });
  }
}
