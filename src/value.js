"use strict";

import endpoint from "./endpoint";
import ValueCells from "./value-cells";

/**
 * Abstract representation of a attribute.
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

  cells(){
    return new ValueCells(this.tenant, this.valueId);
  }
}


