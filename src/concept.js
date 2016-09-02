"use strict";

import endpoint from "./endpoint";

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
}
