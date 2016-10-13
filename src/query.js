"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";

/**
 * Abstract representation of a query.
 */
export default class Query {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant     The tenant instance.
   * @param  {String} queryId    The query id.
   */
  constructor(tenant, queryId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The query id.
     * @type {String}
     */
    this.queryId = queryId;
  }

  /**
   * Retrieves query.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("query", this.queryId)
      },
      options
    );
  }

  /**
   * Delete current query
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  delete(options = {}) {
    return this.tenant.execute(
      requests.deleteQuery(this.queryId),
      options
    );
  }

  /**
   * Add filter to query
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  addQueryFilter(queryDefinitionFilter, options = {}) {
    return this.tenant.execute(
      requests.addQueryFilter(this.queryId, queryDefinitionFilter),
      options
    );
  }


}
