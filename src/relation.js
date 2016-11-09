"use strict";

import * as requests from "./requests";

/**
 * Abstract representation of a relation.
 */
export default class Relation {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant     The tenant instance.
   * @param  {String} relationId  The relation id.
   */
  constructor(tenant, relationId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The relation id.
     * @type {String}
     */
    this.relationId = relationId;
  }

  /**
   * Updates current relation
   *
   * @param {Object} relationCategory    Relation Category
   * @param  {Object} options           The options object.
   * @returns {Promise.<Object, Error>}
   */
  specifyRelationCategory(relationCategory, options = {}) {
    return this.tenant.execute(
      requests.specifyRelationCategory(this.relationId, relationCategory),
      options
    );
  }
}
