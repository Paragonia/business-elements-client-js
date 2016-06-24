"use strict";

import endpoint from "./endpoint";

/**
 * Abstract representation of a attribute.
 */
export default class Attribute {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant     The tenant instance.
   * @param  {String} attributeId  The attribute id.
   */
  constructor(tenant, attributeId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The attribute id.
     * @type {String}
     */
    this.attributeId = attributeId;
  }

  /**
   * Retrieves attribute.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("attribute", this.attributeId)
      },
      options
    );
  }
}
