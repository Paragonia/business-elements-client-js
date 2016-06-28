"use strict";

import endpoint from "./endpoint";
import Attribute from "./attribute";

/**
 * Abstract representation of attributes.
 */
export default class Attributes {

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
   * Retrieves the list of attributes in the current tenant.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("attributes")}, options)
      .then((response) => {
        const embedded = response["_embedded"];
        if (embedded) {
          const attributes = embedded["be:attribute"];
          if (attributes) {
            return attributes;
          }
        }
        return [];
      });
  }

  /**
   * Retrieve a attribute object to perform operations on it.
   *
   * @param  {String} id The id of the attribute.
   * @return {Attribute}
   */
  attribute(id) {
    return new Attribute(this.tenant, id);
  }
}
