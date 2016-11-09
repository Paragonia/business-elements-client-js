"use strict";

import Relation from "./relation";
import RelationCategory from "./relation-category";

/**
 * Abstract representation of Relations.
 */
export default class Relations {

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
   * Retrieve a value object to perform operations on it.
   *
   * @param  {String} id      The id of the relation.
   * @return {Relation}
   */
  relation(relationId) {
    return new Relation(this.tenant, relationId);
  }

  listConceptsRelationCategories() {
    return [
      RelationCategory.ASSOCIATION,
      RelationCategory.ATTRIBUTION,
      RelationCategory.CATEGORIZATION,
      RelationCategory.COMPOSITION,
      RelationCategory.CONSTITUTION,
      RelationCategory.CONSTRUCTION,
      RelationCategory.FORMULATION,
      RelationCategory.MEMBERSHIP,
      RelationCategory.OPERATION,
      RelationCategory.SPATIALIZATION
    ];
  }
}
