"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";

/**
 * Abstract representation of a project.
 */
export default class MarkerCell {

  /**
   * Constructor.
   *
   * @param  {Tenant}  tenant     The tenant instance.
   * @param  {String}  cellId     The cell id.
   */
  constructor(tenant, cellId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

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
        path: endpoint("markerCell", this.cellId)
      },
      options
    );
  }

  /**
   * Updates current cell
   *
   * @param {Object} name      Cell name
   * @param {Object} color     Cell color
   * @param  {Object} options The options object.
   * @returns {Promise.<Object, Error>}
   */
  updateMarkerCell(name, color, options = {}) {
    return this.tenant.execute(
      requests.updateMarkerCell(this.cellId, name, color),
      options
    );
  }

  /**
   * Delete current marker cell
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteMarkerCell(this.cellId),
      options
    );
  }

}
