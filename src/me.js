"use strict";

import * as requests from "./requests";

/**
 * Abstract representation of Me (as user).
 */
export default class Me {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant The tenant instance.
   */
  constructor(tenant) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;
  }

  /**
   * Retrieves Me (as user).
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options={}) {
    return this.tenant.execute(requests.me(), options);
  }

  /**
   * Update display name
   *
   * @param {String} name             The updated display name
   * @param  {Object} options         The options object.
   * @returns {Promise.<Object, Error>}
   */
  updateDisplayName(name, options = {}) {
    return this.tenant.execute(requests.updateMyDisplayName(name), options);
  }

  /**
   * Update display biography
   *
   * @param {String} biography             The updated display biography
   * @param  {Object} options         The options object.
   * @returns {Promise.<Object, Error>}
   */
  updateBiography(biography, options = {}) {
    return this.tenant.execute(requests.updateMyBiography(biography), options);
  }

  /**
   * Update avatar picture
   *
   * @param {String} pictureUri       The updated avatar pictureUri
   * @param  {Object} options         The options object.
   * @returns {Promise.<Object, Error>}
   */
  updateAvatarImage(pictureUri, options = {}) {
    return this.tenant.execute(requests.updateMyAvatarImage(pictureUri), options);
  }


}
