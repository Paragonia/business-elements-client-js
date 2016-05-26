"use strict";

import * as requests from "./requests";

/**
 * Abstract representation of a selected tenant.
 *
 */
export default class Users {
  /**
   * Constructor.
   *
   * @param  {BusinessElementsClient} client     The client instance.
   * @param  {Object}      options.headers       The headers object option.
   */
  constructor(client, options = {}) {
    /**
     * @ignore
     */
    this.client = client;

    /**
     * The default options object.
     * @ignore
     * @type {Object}
     */
    this.options = options;
  }

  /**
   * Merges passed request options with default users ones, if any.
   *
   * @private
   * @param  {Object} options The options to merge.
   * @return {Object}         The merged options.
   */
  _getUsersOptions(options = {}) {
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
   * Checks if the given email address is available to be used for creating a user.
   *
   * @param  {String}   emailAddress    The email address to check.
   * @param  {Object}   [options]       The options object.
   * @return {Promise<Boolean, Error>}  Indicating if the user email is available.
   */
  isEmailAvailable(emailAddress, options = {}) {
    const headers = this._getUsersOptions(options);
    return this.client
      .execute(requests.isEmailAvailable(emailAddress, headers), true)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  /**
   * Creates the user with the specified credentials.
   *
   * @param  {String}   emailAddress     The email address for the user.
   * @param  {boolean}   raw
   * @param  {String}   [password]       The password for the user.
   * @param  {Object}   [options]        The options object.
   * @return {Promise<Object, Error>}
   */
  create(emailAddress, password, options = {}) {
    const reqOptions = this._getUsersOptions(options);
    return this.client.execute(requests.createUser(emailAddress, password, reqOptions), reqOptions.raw);
  }

  /**
   * Activates the specified user.
   *
   * @param  {boolean}  raw              Specifies the response type
   * @param  {String}   userId           Id of the user to activate.
   * @param  {String}   activationCode   Required to activate the user.
   * @param  {Object}   [options]        The options object.
   * @return {Promise<Object, Error>}
   */
  activate(userId, activationCode, options = {}) {
    const reqOptions = this._getUsersOptions(options);
    return this.client.execute(requests.activateUser(userId, activationCode, reqOptions), reqOptions.raw);

  }

  /**
   * Returns current user information.
   *
   * @param  {Object}   [options]        The options object.
   * @returns {Promise.<Object, Error>}
   */
  me(options = {}) {
    const reqOptions = this._getUsersOptions(options);
    return this.client.execute(requests.me(reqOptions));
  }

  /**
   * Makes a password reset request
   *
   * @param  {boolean}  raw              Specifies the response type
   * @param emailAddress
   * @param options
   * @returns {Promise.<Object, Error>}
   */
  passwordResetRequest(emailAddress, options = {}) {
    const reqOptions = this._getUsersOptions(options);
    return this.client.execute(requests.passwordResetRequest(emailAddress, reqOptions), reqOptions.raw);
  }

  /**
   * Resets the user password to the given value
   *
   * @param  {boolean}  raw              Specifies the response type (json body or promise)
   * @param userId
   * @param passwordResetCode
   * @param password
   * @param raw
   * @param options
   * @returns {Promise.<Object, Error>}
   */
  passwordReset(userId, passwordResetCode, password, options = {}) {
    const reqOptions = this._getUsersOptions(options);
    return this.client.execute(requests.passwordReset(userId, passwordResetCode, password, reqOptions), reqOptions.raw)
  }
}
