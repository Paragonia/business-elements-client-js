"use strict";

import endpoint from "./endpoint";
import Attribute from "./attribute";
import * as requests from "./requests";

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

  /**
   * Creates the attribute with the specified properties.
   *
   * @param  {String}  name          The name of the attribute
   * @param  {Object}  schema        The schema of the attribute
   * @param  {Object}  options       The options object.
   * @return {Promise<Object, Error>}
   */
  create(name, schema, options = {}) {
    return this.tenant.execute(
      requests.createAttribute(name, schema),
      options
    );
  }
}
