"use strict";

import EventEmitter from "event-emitter-es6";

/**
 * Enhanced HTTP client for the Business Elements protocol.
 * @private
 */
export default class HTTP extends EventEmitter {

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
    return {
      timeout: 30000,
      requestMode: "cors",
      credentials: "include"
    };
  }

  static get jsonContentTypes() {
    return [
      "application/json",
      "application/hal+json"
    ];
  }

  static toQueryString(obj) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      return "";
    } else {
      return "?" + Object.keys(obj).sort().reduce((a, k) => {
        const v = obj[k];
        if (v) {
          a.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
        }
        return a;
      }, []).join("&");
    }
  }

  /**
   * Constructor.
   *
   * Options:
   * - {Number} timeout      The request timeout in ms (default: `30000`).
   * - {String} requestMode  The HTTP request mode (default: `"cors"`).
   * - {String} credentials  Whether to include credentials (default: `"include"`).
   *
   * @param {Object}       options The options object.
   */
  constructor(options = {}) {
    super({emitDelay: 0});

    this.httpEvents = {
      REQUEST_STARTED:"request-started",
      REQUEST_ENDED:"request-ended",
      FETCH_ERROR: "fetch-error",
      COMMUNICATION_ERROR: "unmarshaling-response-error",
      BUSINESS_ERROR: "business-error",
      TIMEOUT_ERROR: "timeout-error"
    };

    this.pendingRequests = 0;

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

    /**
     * Include credentials.
     * @type {String}
     */
    this.credentials = options.credentials;
  }

  _addPendingRequest() {
    if (this.pendingRequests++ == 0){
      this.emit(this.httpEvents.REQUEST_STARTED);
    }
  }

  _removePendingRequest() {
    if (--this.pendingRequests == 0){
      this.emit(this.httpEvents.REQUEST_ENDED);
    }
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
  request(url, options = {headers: {}}) {
    let response, status, statusText, headers, isTimeout;

    // Ensure default request headers are always set
    options.headers = Object.assign({}, HTTP.DEFAULT_REQUEST_HEADERS, options.headers);
    if (options.body) {
      // Add Content-Type when request body is present
      options.headers = Object.assign({}, {"Content-Type": "application/json"}, options.headers);
    }
    options.mode = this.requestMode;
    options.credentials = this.credentials;

    return new Promise((resolve, reject) => {
      this._addPendingRequest();
      const _timeoutId = setTimeout(() => {
        this._removePendingRequest();
        isTimeout = true;
        this.emit(this.httpEvents.TIMEOUT_ERROR);
        reject(new Error("Request timeout."));
      }, this.timeout);
      fetch(url, options) .then(res => {
        if (!isTimeout) {
          clearTimeout(_timeoutId);
          resolve(res);
        }
      }).catch(err => {
        this.emit(this.httpEvents.FETCH_ERROR, err);
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
        this._removePendingRequest();
        this.emit(this.httpEvents.COMMUNICATION_ERROR, err);
        const error = new Error(`HTTP ${status || 0}; ${err}`);
        error.response = response;
        error.stack = err.stack;
        throw error;
      })
      .then(json => {
        this._removePendingRequest();
        if(status >= 400) {
          let message = `HTTP ${status}`;
          if(json) {
            message += json.error || "";
          }
          message += statusText || "";
          const error = new Error(message.trim());
          error.response = response;
          error.data = json;
          this.emit(this.httpEvents.BUSINESS_ERROR, error);
          throw error;
        }
        return {status, json, headers};
      });
  }
}
