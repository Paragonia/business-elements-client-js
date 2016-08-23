"use strict";

import endpoint from "./endpoint";

export default class BeProxy {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant                The tenant instance.
   */
  constructor(tenant) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;
  }

  /**
   * Checks if url is embeddable
   *
   * @param url       The verified url
   * @param options   The options object
   *
   *  @returns {*|int} Status response representing the headers status response for the checked url
   */
  checkEmbeddable(url, options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("proxyEmbeddable", url)
      },
      options,
      true
    ).then((response) => {
      return response.status;
    });
  }

}
