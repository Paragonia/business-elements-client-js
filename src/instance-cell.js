"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";

/**
 * Abstract representation of a instance cell.
 */
export default class InstanceCell {

  /**
   * Constructor.
   *
   * @param  {Tenant}  tenant           The tenant instance.
   * @param  {String}  instanceId       The instance id.
   * @param  {String}  instanceCellId   The instance cell id.
   */
  constructor(tenant, instanceId, instanceCellId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The value id.
     * @type {String}
     */
    this.instanceId = instanceId;

    /**
     * The cell.
     * @type {String}
     */
    this.instanceCellId = instanceCellId;
  }

  /**
   * Retrieves project context.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("instanceCell", this.instanceId, this.instanceCellId)
      },
      options
    );
  }

  /**
   * Update position of instance cell
   *
   * @param {Object} position         The updated position of the instance cell
   * @param {Object} options          The options object
   * @returns {Promise.<Object, Error>}
   */
  update(position, options = {}) {
    return this.tenant.execute(
      requests.updateInstanceCell(this.instanceId, this.instanceCellId, position),
      options
    );
  }

  /**
   * Delete current instance cell
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteInstanceCell(this.instanceId, this.instanceCellId),
      options
    );
  }

}
