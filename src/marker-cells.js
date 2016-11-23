"use strict";

import endpoint from "./endpoint";
import MarkerCell from "./marker-cell";
import * as requests from "./requests";

/**
 * Abstract representation of marker cells.
 */
export default class MarkerCells {

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
   * Retrieves the list of marker cells for the current user.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("markerCells")}, options)
      .then((response) => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:marker"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve a cell object to perform operations on it.
   *
   * @param  {String} cellId The id of the cell.
   * @return {MarkerCell}
   */
  markerCell(cellId) {
    return new MarkerCell(this.tenant, cellId);
  }

  /**
   *  Create a new context for the current project
   *
   * @param {Object} contextId  The project context id under which the marker cell is created
   * @param {Object} position   Axial position of the marker cell
   * @param {Object} options    The options object
   * @returns {Promise.<Object, Error>}
   */
  create(contextId, position, options = {}) {
    return this.tenant.execute(
      requests.createMarkerCell(contextId, position),
      options
    );
  }
}

