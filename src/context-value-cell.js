"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";

/**
 * Abstract representation of a project.
 */
export default class ContextValueCell {

  /**
   * Constructor.
   *
   * @param  {Tenant}  tenant     The tenant instance.
   * @param  {String}  valueId    The value id.
   * @param  {String}  cellId     The cell id.
   */
  constructor(tenant, valueId, cellId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The value id.
     * @type {String}
     */
    this.valueId = valueId;

    /**
     * The cell.
     * @type {String}
     */
    this.cellId = cellId;
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
        path: endpoint("cell", this.valueId, this.cellId)
      },
      options
    );
  }

  /**
   * Updates current cell
   *
   * @param {String} name                 Context name
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  edit(name, options = {}) {
    return this.tenant.execute(
      requests.editContextValueCell(this.valueId, this.cellId),
      options
    );
  }

  /**
   * Delete current context
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteContextValueCell(this.valueId, this.cellId),
      options
    );
  }

}
