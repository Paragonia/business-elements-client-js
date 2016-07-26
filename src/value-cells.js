"use strict";

import endpoint from "./endpoint";
import ValueCell from "./value-cell";
import * as requests from "./requests";

/**
 * Abstract representation of project contexts.
 */
export default class ValueCells {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant The tenant instance.
   * @param  {String} valueId id.
   */
  constructor(tenant, valueId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The value id
     * @type {String}
     */
    this.valueId = valueId;
  }

  /**
   * Retrieves the list of cells for the current value.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("cells", (this.valueId))}, options)
      .then((response) => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:cells"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve a cell object to perform operations on it.
   *
   * @param  {String} cellId The id of the cell.
   * @return {ValueCell}
   */
  cell(cellId) {
    return new ValueCell(this.tenant, this.valueId, cellId);
  }

  /**
   *  Create a new context for the current project
   *
   * @param {Object} projectId         The project id under which the value cell is crated
   * @param {Object} projectContextId  The project context id under which the value cell is crated
   * @param {Object} position          Axial position of the value cell
   * @param {Object} options           The options object
   * @returns {Promise.<Object, Error>}
   */
  create(projectId, projectContextId, position, options = {}) {
    return this.tenant.execute(
      requests.createValueCell(this.valueId, projectId, projectContextId, position),
      options
    );
  }
}

