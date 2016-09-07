"use strict";

import Instance from "./instance";
import * as requests from "./requests";

/**
 * Abstract representation of Instances.
 */
export default class Instances {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant The tenant instance.
   * @param  {Object} project from which the instances is linked to.
   */
  constructor(tenant, project) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The project id.
     * @type {String}
     */
    this.projectId = project.projectId;
  }

  /**
   * Search for instances by conceptId and projectId in the current tenant.
   *
   * @param  {String} conceptId       The concept id from which the instances is searched for.
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  searchByConceptId(conceptId, options = {}) {
    return this.tenant.execute(requests.searchInstances(this.projectId, conceptId), options)
      // return empty string when response is missing certain fields to help client logic
      .then((response) => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:instance"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve a instance object to perform operations on it.
   *
   * @param  {String} id        The id of the instance.
   * @return {Instance}
   */
  instance(id) {
    return new Instance(this.tenant, this.projectId, id);
  }

  /**
   * Creates the instance with the specified properties.
   *
   * @param  {String} conceptHandle  The handle of the concept.
   * @param  {Array}  properties     The array containing attribute-handle, path and value
   * @param  {Array}  relations      The array of concept-handles on which instance has relations with
   *
   * @param  {Object} options        The options object.
   * @return {Promise<Object, Error>}
   */
  create(conceptHandle, properties, relations, options = {}) {
    return this.tenant.execute(
      requests.createInstance(this.projectId, conceptHandle, properties, relations),
      options
    );
  }
}
