"use strict";

import endpoint from "./endpoint";
import ProjectContext from "./project-context";
import * as requests from "./requests";

/**
 * Abstract representation of project contexts.
 */
export default class ProjectContexts {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant The tenant instance.
   * @param  {Project} project The project instance.
   */
  constructor(tenant, project) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The project
     * @type {Project}
     */
    this.project = project;
  }

  /**
   * Retrieves the list of project contexts for the current project.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("projectContexts", (this.project.projectId))}, options)
      .then((response) => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:project_context"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve a project context object to perform operations on it.
   *
   * @param  {String} id The id of the project context.
   * @return {ProjectContext}
   */
  context(id) {
    return new ProjectContext(this.tenant, this.project, id);
  }

  /**
   *  Create a new context for the current project
   *
   * @param {String} name       Context name
   * @param {Object} options    The options object
   * @returns {Promise.<Object, Error>}
   */
  create(name, options = {}) {
    return this.tenant.execute(
      requests.createProjectContext(this.project.projectId, name),
      options
    );
  }
}
