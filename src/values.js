"use strict";

import endpoint from "./endpoint";
import Value from "./value";
import * as requests from "./requests";

/**
 * Abstract representation of values.
 */
export default class Values {

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
   * Retrieves the list of values in the current tenant.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("values")}, options)
      .then((response) => {
        const embedded = response["_embedded"];
        if (embedded) {
          const values = embedded["be:value"];
          if (values) {
            return values;
          }
        }
        return [];
      });
  }

  /**
   * Retrieve a value object to perform operations on it.
   *
   * @param  {String} id              The id of the value.
   * @return {Value}
   */
  value(id) {
    return new Value(this.tenant, id);
  }

  /**
   * Creates the value with the specified properties.
   *
   * @param  {String}  projectId        The project id.
   * @param {String} attributeHandle    The selected attribute
   * @param {Object} value    The form data object
   * @param  {Object} options       The options object.
   * @return {Promise<Object, Error>}
   */
  create(projectId, attributeHandle, value, options = {})
  {
    return this.tenant.execute(
      requests.createValue(projectId, attributeHandle, value),
      options
    );
  }

}

