"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";

/**
 * Abstract representation of a project.
 */
export default class Project {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant     The tenant instance.
   * @param  {String} projectId  The project id.
   */
  constructor(tenant, projectId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The project id.
     * @type {String}
     */
    this.projectId = projectId;
  }

  /**
   * Retrieves project.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options={}) {
    return this.tenant.execute(
      {
        path: endpoint("project", this.projectId)
      },
      options
    );
  }

  /**
   * Updates current project
   *
   * @param {String} name                 Project name
   * @param {String} visibility           Project visibility (can be "public" or "members")
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  update(name, visibility, options = {}) {
    return this.tenant.execute(
      requests.updateProject(this.projectId, name, visibility),
      options
    );
  }

  /**
   * Delete current project
   * 
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteProject(this.projectId),
      options
    );
  }
}
