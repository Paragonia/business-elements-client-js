"use strict";

import endpoint from "./endpoint";

/**
 * Abstract representation of a instance.
 */
export default class Instance {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant     The tenant instance.
   * @param  {String} instanceId  The instance id.
   */
  constructor(tenant, projectId, instanceId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The project id.
     * @type {String}
     */
    this.projectId = projectId;

    /**
     * The instance id.
     * @type {String}
     */
    this.instanceId = instanceId;
  }

  /**
   * Retrieves instance.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("instance", this.projectId, this.instanceId)
      },
      options
    );
  }
}
