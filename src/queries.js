"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";
import Query from "./query";

/**
 * Abstract representation of queries.
 */
export default class Queries {

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
   * Retrieves the list of queries.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("queries")}, options)
      .then((response) => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:queryDefinition"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve a query object to perform operations on it.
   *
   * @param  {String} id              The id of the query.
   * @return {Query}
   */
  query(id) {
    return new Query(this.tenant, id);
  }

  /**
   * Creates the query with the specified properties.
   *
   * @param  {String}  conceptId        The id of the concept.
   * @param  {String} collectionName    The name of the collection
   * @param  {Object} options           The options object.
   * @return {Promise<Object, Error>}
   */
  create(conceptId, collectionName, options = {}) {
    return this.tenant.execute(
      requests.createQuery(conceptId, collectionName),
      options
    );
  }
}
