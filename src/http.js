"use strict";

/**
 * Enhanced HTTP client for the Business Elements protocol.
 * @private
 */
export default class HTTP {

  /**
   * Default HTTP request headers applied to each outgoing request.
   *
   * @type {Object}
   */
  static get DEFAULT_REQUEST_HEADERS() {
    return {
      "Accept": "application/json"
    };
  }

  /**
   * Default options.
   *
   * @type {Object}
   */
  static get defaultOptions() {
    return {timeout: 5000, requestMode: "cors"};
  }

  /**
   * Constructor.
   *
   * Options:
   * - {Number} timeout      The request timeout in ms (default: `5000`).
   * - {String} requestMode  The HTTP request mode (default: `"cors"`).
   *
   * @param {Object}       options The options object.
   */
  constructor(options={}) {

    options = Object.assign({}, HTTP.defaultOptions, options);

    /**
     * The request mode.
     * @see  https://fetch.spec.whatwg.org/#requestmode
     * @type {String}
     */
    this.requestMode = options.requestMode;

    /**
     * The request timeout.
     * @type {Number}
     */
    this.timeout = options.timeout;
  }

  /**
   * Performs an HTTP request to the Business Elements server.
   *
   * Options:
   * - `{Object} headers` The request headers object (default: {})
   *
   * Resolves with an object containing the following HTTP response properties:
   * - `{Number}  status`  The HTTP status code.
   * - `{Object}  json`    The JSON response body.
   * - `{Headers} headers` The response headers object; see the ES6 fetch() spec.
   *
   * @param  {String} url     The URL.
   * @param  {Object} options The fetch() options object.
   * @return {Promise}
   */
  request(url, options={headers:{}}) {
    let response, status, statusText, headers, isTimeout;

    // Ensure default request headers are always set
    options.headers = Object.assign({}, HTTP.DEFAULT_REQUEST_HEADERS, options.headers);
    if (options.body) {
      // Add Content-Type when request body is present
      options.headers = Object.assign({}, {"Content-Type": "application/json"}, options.headers);
    }
    options.mode = this.requestMode;

    return new Promise((resolve, reject) => {
      const _timeoutId = setTimeout(() => {
        isTimeout = true;
        reject(new Error("Request timeout."));
      }, this.timeout);
      fetch(url, options) .then(res => {
        if (!isTimeout) {
          clearTimeout(_timeoutId);
          resolve(res);
        }
      }).catch(err => {
        if (!isTimeout) {
          clearTimeout(_timeoutId);
          reject(err);
        }
      });
    })
      .then(res => {
        response = res;
        headers = res.headers;
        status = res.status;
        statusText = res.statusText;
        return res.text();
      })
      // Check if we have a body; if so parse it as JSON.
      .then(text => {
        if (text.length === 0) {
          return null;
        }
        // Note: we can't consume the response body twice.
        return JSON.parse(text);
      })
      .catch(err => {
        const error = new Error(`HTTP ${status || 0}; ${err}`);
        error.response = response;
        error.stack = err.stack;
        throw error;
      })
      .then(json => {
        if (json && status >= 400) {
          let message = `HTTP ${status} ${json.error||""}: `;
          message += statusText || "";
          const error = new Error(message.trim());
          error.response = response;
          error.data = json;
          throw error;
        }
        return {status, json, headers};
      });
  }
}
