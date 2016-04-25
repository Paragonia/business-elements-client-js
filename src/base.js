"use strict";

import HTTP from "./http";

/**
 * Currently supported protocol version.
 * @type {String}
 */
export const SUPPORTED_PROTOCOL_VERSION = "v1";

/**
 * HTTP client for the Business Elements API.
 *
 * @example
 * const client = new BusinessElementsClient("https://api2.businesselements.org/v1");
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
   * The remote endpoint base URL. Setting the value will also extract and validate the version.
   * @type {String}
   */
  get remote() {
    return this._remote;
  }

  /**
   * @ignore
   */
  set remote(url) {
    let version;
    try {
      version = url.match(/\/(v\d+)\/?$/)[1];
    } catch (err) {
      throw new Error("The remote URL must contain the version: " + url);
    }
    if (version !== SUPPORTED_PROTOCOL_VERSION) {
      throw new Error(`Unsupported protocol version: ${version}`);
    }
    this._remote = url;
    this._version = version;
  }

  /**
   * The current server protocol version, eg. `v1`.
   * @type {String}
   */
  get version() {
    return this._version;
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
}