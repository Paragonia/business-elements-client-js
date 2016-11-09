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
   * Updates current relation category
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

  /**
   * Updates current relation subject
   *
   * @param {Object} subjectCriteria    Relation Subject Category
   * @param  {Object} options           The options object.
   * @returns {Promise.<Object, Error>}
   */
  specifyRelationSubjectCriteria(subjectCriteria, options = {}) {
    return this.tenant.execute(
      requests.specifyRelationSubjectCriteria(this.relationId, subjectCriteria),
      options
    );
  }

  /**
   * Updates current relation object
   *
   * @param {Object} objectCategory    Relation Object Category
   * @param  {Object} options           The options object.
   * @returns {Promise.<Object, Error>}
   */
  specifyRelationObjectCriteria(objectCategory, options = {}) {
    return this.tenant.execute(
      requests.specifyRelationObjectCriteria(this.relationId, objectCategory),
      options
    );
  }

  /**
   * Updates current relation direction
   *
   * @param {Object} direction    Relation direction
   * @param  {Object} options           The options object.
   * @returns {Promise.<Object, Error>}
   */
  specifyRelationDirection(direction, options = {}) {
    return this.tenant.execute(
      requests.specifyRelationDirection(this.relationId, direction),
      options
    );
  }

  /**
   * Delete current relation
   *
   * @param  {Object} options           The options object.
   * @returns {Promise.<Object, Error>}
   */
  deleteRelationSpecification(options = {}) {
    return this.tenant.execute(
      requests.deleteRelationSpecification(this.relationId),
      options
    );
  }
}
