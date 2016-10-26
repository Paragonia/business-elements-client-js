"use strict";

import Instance from "./instance";

/**
 * Abstract representation of Instances.
 */
export default class Instances {

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
   * Retrieve a instance object to perform operations on it.
   *
   * @param  {String} id        The id of the instance.
   * @return {Instance}
   */
  instance(id) {
    return new Instance(this.tenant, id);
  }

}
