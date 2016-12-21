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
  edit(projectId, attributeHandle, value, options = {}) {
    return this.tenant.execute(
      requests.editValue(this.valueId, projectId, attributeHandle, value),
      options
    );
  }

  /**
   * Updates the value with the specified properties.
   *
   * @param {String}  projectId         The project id.
   * @param {String} attributeHandle    The selected attribute
   * @param {Object} languageCode       The selected language code
   * @param {Object} value              The form data object
   * @param {Object} options            The options object.
   * @return {Promise<Object, Error>}
   */
  specifyTranslation(projectId, attributeHandle, languageCode, value, options = {}) {
    return this.tenant.execute(
      requests.specifyTranslation(this.valueId, projectId, attributeHandle, languageCode, value),
      options
    );
  }

  /**
   * Deletes the translation associated with the language code
   *
   * @param {String} projectId          The project id
   * @param {Object} languageCode       Language code of the translation
   * @param {Object} options            The options object
   * @returns {Promise.<Object, Error>}
   */
  deleteTranslation(projectId, languageCode, options = {}) {
    return this.tenant.execute(
      requests.deleteTranslation(this.valueId, projectId, languageCode),
      options
    );
  }

  /**
   * Deletes the value
   *
   * @param  {String}  projectId        The project id.
   * @param  {Object} options       The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(projectId, options = {}) {
    return this.tenant.execute(
      requests.deleteValue(this.valueId, projectId), options
    );
  }

  cells() {
    return new ValueCells(this.tenant, this.valueId);
  }

  /**
   * Retrieves the list of values in the current tenant.
   *
   * @param {String}      The values project id field
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  listValueHistory(options = {}) {
    return this.tenant.execute({path: endpoint("valuesHistory", this.valueId)}, options)
      .then((response) => {
        const embedded = response["_embedded"];
        if (embedded) {
          const values = embedded["be:valueHistory"];
          if (values) {
            return values;
          }
        }
        return [];
      });
  }

  /**
   * @param {Object} options            The options object.
   * @return {Promise<Object, Error>}
   */
  getValueHistory(revision, options = {}) {
    return this.tenant.execute(
      requests.getValueHistory(this.valueId, revision), options
    );
  }

}


