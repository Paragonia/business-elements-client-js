"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";

/**
 * Abstract representation of a project.
 */
export default class ValueCell {

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
   * @param {Object} position                Cell position
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  edit(position, options = {}) {
    return this.tenant.execute(
      requests.editValueCell(this.valueId, this.cellId, position),
      options
    );
  }

  /**
   * Marks the current cell
   *
   * @param {Object} marker     The Cell marker to use
   * @param  {Object} options   The options object.
   * @returns {Promise.<Object, Error>}
   */
  mark(marker, options = {}) {
    return this.tenant.execute(
      requests.markValueCell(this.valueId, this.cellId, marker),
      options
    );
  }

  /**
   * Un marks the current cell
   *
   * @param {Object} marker     The Cell marker to use
   * @param  {Object} options   The options object.
   * @returns {Promise.<Object, Error>}
   */
  unMark(options = {}) {
    return this.tenant.execute(
      requests.unMarkValueCell(this.valueId, this.cellId),
      options
    );
  }

  /**
   * Delete current value cell
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteValueCell(this.valueId, this.cellId),
      options
    );
  }

}
