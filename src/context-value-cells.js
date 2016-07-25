"use strict";

import endpoint from "./endpoint";
import ContextValueCell from "./context-value-cell";
import * as requests from "./requests";

/**
 * Abstract representation of project contexts.
 */
export default class ContextValueCells {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant The tenant instance.
   * @param  {String} value id.
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
   * @param  {String} id The id of the cell.
   * @return {ContextValueCell}
   */
  cell(id) {
    return new ContextValueCell(this.tenant, id);
  }

  /**
   *  Create a new context for the current project
   *
   * @param {Object} options    The options object
   * @returns {Promise.<Object, Error>}
   */
  create(projectId, projectContextId, position, options = {}) {
    return this.tenant.execute(
      requests.createContextValueCell(this.valueId, projectId, projectContextId, position),
      options
    );
  }
}

