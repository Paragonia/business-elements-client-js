"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";

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

  /**
   * Updates current attribute.
   *
   * @param  {Object} schema            Attribute schema
   * @param  {Object} options           The options object.
   * @returns {Promise.<Object, Error>}
   */
  edit(schema, options = {}) {
    return this.tenant.execute(
      requests.updateAttribute(this.attributeId, schema),
      options
    );
  }

  /**
   * Delete current attribute
   *
   * @param  {Object} options           The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteAttribute(this.attributeId),
      options
    );
  }
}
