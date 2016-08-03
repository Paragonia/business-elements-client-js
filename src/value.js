"use strict";

import endpoint from "./endpoint";
import ValueCells from "./value-cells";
import * as requests from "./requests";

/**
 * Abstract representation of a value.
 */
export default class Value {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant     The tenant instance.
   * @param  {String} valueId  The value id.
   */
  constructor(tenant, valueId) {

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
  }

  /**
   * Retrieves values.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("value", this.valueId)
      },
      options
    );
  }

  /**
   * Updates the value with the specified properties.
   *
   * @param  {String}  projectId        The project id.
   * @param {String} attributeHandle    The selected attribute
   * @param {Object} value    The form data object
   * @param  {Object} options       The options object.
   * @return {Promise<Object, Error>}
   */
  edit(projectId, attributeHandle, value, options = {})
  {
    return this.tenant.execute(
      requests.editValue(this.valueId, projectId, attributeHandle, value),
      options
    );
  }

  cells(){
    return new ValueCells(this.tenant, this.valueId);
  }
}


