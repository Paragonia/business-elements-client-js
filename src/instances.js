"use strict";

import Instance from "./instance";

/**
 * Abstract representation of Instances.
 */
export default class Instances {

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
   * Retrieve a instance object to perform operations on it.
   *
   * @param  {String} id        The id of the instance.
   * @return {Instance}
   */
  instance(id) {
    return new Instance(this.tenant, id);
  }

  /**
   * Free-text search on instances and on the content of its linked resource
   *
   * @param  {String}  projectId        The project id.
   * @param  {String}  searchText       The free-text search
   * @param  {Object}  options          The options object.
   * @return {Promise<Object, Error>}   The promise, containing the found instances
   */
  search(projectId, searchText, options = {}) {
    return this.tenant.execute({
      method: "POST",
      path: endpoint("instancesSearchByText", projectId),
      body: {
        searchText
      }
    }, options)
      .then((response) => {
        return response;
      });
  }

}
