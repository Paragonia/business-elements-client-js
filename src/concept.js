"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";

/**
 * Abstract representation of a concept.
 */
export default class Concept {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant     The tenant instance.
   * @param  {String} conceptId  The concept id.
   */
  constructor(tenant, conceptId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The concept id.
     * @type {String}
     */
    this.conceptId = conceptId;
  }

  /**
   * Retrieves concept.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("concept", this.conceptId)
      },
      options
    );
  }

  /**
   * Updates current concept
   *
   * @param {Object} schema             Concept schema
   * @param  {Object} options           The options object.
   * @returns {Promise.<Object, Error>}
   */
  edit(schema, options = {}) {
    return this.tenant.execute(
      requests.updateConcept(this.conceptId, schema),
      options
    );
  }

  /**
   * Delete current concept
   *
   * @param  {Object} options           The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteConcept(this.conceptId),
      options
    );
  }

  /**
   * Updates current concept category
   *
   * @param {Object} category          Concept category
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  editCategory(category, options = {}) {
    return this.tenant.execute(
      requests.updateConceptCategory(this.conceptId, category),
      options
    );
  }

  /**
   * Updates current concept form
   *
   * @param {Object} form          Concept form
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  editForm(form, options = {}) {
    return this.tenant.execute(
      requests.updateConceptForm(this.conceptId, form),
      options
    );
  }
}
