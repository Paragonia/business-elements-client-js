"use strict";

import InstanceCell from "./instance-cell";
import * as requests from "./requests";

/**
 * Abstract representation of instance cells.
 */
export default class InstanceCells {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant The tenant instance.
   * @param  {String} instanceId id.
   */
  constructor(tenant, instanceId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The value id
     * @type {String}
     */
    this.instanceId = instanceId;
  }

  /**
   * Retrieve a instance cell object to perform operations on it.
   *
   * @param  {String} instanceCellId The id of the instance cell.
   * @return {InstanceCell}
   */
  cell(instanceCellId) {
    return new InstanceCell(this.tenant, this.instanceId, instanceCellId);
  }

  /**
   *  Create a new instance cell
   *
   * @param {Object} projectId         The project id under which the instance cell is created
   * @param {Object} contextId         The context id under which the instance cell is created
   * @param {Object} position          Axial position of the instance cell
   * @param {Object} options           The options object
   * @returns {Promise.<Object, Error>}
   */
  create(projectId, contextId, position, options = {}) {
    return this.tenant.execute(
      requests.createInstanceCell(this.instanceId, projectId, contextId, position),
      options
    );
  }

}

