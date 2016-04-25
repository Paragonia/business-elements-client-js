"use strict";

import HTTP from "./http";

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
      bucket:  options.bucket  || "default",
      headers: options.headers || {},
      safe:    !!options.safe,
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
    return {
      ...this.defaultReqOptions,
      ...options,
      // Note: headers should never be overridden but extended
      headers: {
        ...this.defaultReqOptions.headers,
        ...options.headers
      },
    };
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
}