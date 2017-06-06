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
   * Retrieves the list of values in the current tenant.
   *
   * @param {String}      The values project id field
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  listProjectValues(projectId, options = {}) {
    return this.tenant.execute({path: endpoint("valuesProject", projectId)}, options)
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
   * @param  {String} projectId         The project id.
   * @param {String}  attributeHandle   The selected attribute
   * @param {Object}  value             The form data object
   * @param {String}  copiedFromValueId The valueId from which the current value is copied from
   * @param  {Object} options           The options object.
   * @return {Promise<Object, Error>}
   */
  create(projectId, attributeHandle, value, copiedFromValueId, options = {}) {
    return this.tenant.execute(
      requests.createValue(projectId, attributeHandle, value, copiedFromValueId),
      options
    );
  }

  /**
   * Free-text search on values and on the content of its linked resource
   *
   * @param  {String}  projectId        The project id.
   * @param  {String}  searchText       The free-text search
   * @param  {Object}  options          The options object.
   * @return {Promise<Object, Error>}   The promise, containing the search values
   */
  search(projectId, searchText, options = {}) {
    return this.tenant.execute({
      method: "POST",
      path: endpoint("valuesSearch", projectId),
      body: {
        searchText
      }
    }, options)
      .then((response) => {
        return response;
      });
  }

  /**
   * Search on specific values with matching attributeHandle and data.
   *
   * @param  {String}  projectId        The project id.
   * @param  {String}  attributeHandle  The searched attribute
   * @param  {Object}  data             The form data object
   * @param  {Object}  options          The options object.
   * @return {Promise<Object, Error>}   The promise, containing the search values
   */
  suggestions(projectId, attributeHandle, data, options = {}) {
    return this.tenant.execute({
      method: "POST",
      path: endpoint("valuesSuggestions", projectId),
      body: {
        attributeHandle,
        data
      }
    }, options)
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

}

