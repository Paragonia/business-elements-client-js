"use strict";

import endpoint from "./endpoint";
import Concept from "./concept";
import * as requests from "./requests";
import ConceptCategory from "./concept-category";
import Relations from "./relations";

/**
 * Abstract representation of Concepts.
 */
export default class Concepts {

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
   * Retrieves the list of Concepts in the current tenant.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("concepts")}, options)
      // return empty string when response is missing certain fields to help client logic
      .then((response) => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:concept"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve a value object to perform operations on it.
   *
   * @param  {String} id              The id of the concept.
   * @return {Concept}
   */
  concept(conceptId) {
    return new Concept(this.tenant, conceptId);
  }

  /**
   * Creates the concept with the specified properties.
   *
   * @param  {String}  handle               The handle of the concept.
   * @param  {Object}  schema               The schema object of the concept.
   *
   * @param  {Object} options               The options object.
   * @return {Promise<Object, Error>}
   */
  create(handle, schema, options = {}) {
    return this.tenant.execute(
      requests.createConcept(handle, schema),
      options
    );
  }

  relations() {
    return new Relations(this.tenant);
  }

  listConceptCategories() {
    return [
      ConceptCategory.OBJECT,
      ConceptCategory.PROCESS,
      ConceptCategory.SCHEMA,
      ConceptCategory.SCRIPT,
      ConceptCategory.JUNCTURE,
      ConceptCategory.PARTICIPATION,
      ConceptCategory.DESCRIPTION,
      ConceptCategory.HISTORY,
      ConceptCategory.STRUCTURE,
      ConceptCategory.SITUATION,
      ConceptCategory.REASON,
      ConceptCategory.PURPOSE
    ];
  }
}
