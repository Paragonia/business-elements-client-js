"use strict";

import * as requests from "./requests";

/**
 * Abstract representation of a bout.
 */
export default class Bout {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant     The tenant bout.
   * @param  {String} boutId  The bout id.
   */
  constructor(tenant, boutId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The bout id.
     * @type {String}
     */
    this.boutId = boutId;
  }

  /**
   * Delete current bout
   *
   * @param  {Object} options          The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteBout(this.boutId),
      options
    );
  }
}
