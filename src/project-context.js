"use strict";

import endpoint from "./endpoint";
import ProjectContextEvents from "./project-context-events";
import * as requests from "./requests";

/**
 * Abstract representation of a project.
 */
export default class ProjectContext {

  /**
   * Constructor.
   *
   * @param  {Tenant}  tenant     The tenant instance.
   * @param  {Project} project    The project instance.
   * @param  {String}  contextId  The context id.
   */
  constructor(tenant, project, contextId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The project.
     * @type {Project}
     */
    this.project = project;

    /**
     * The context.
     * @type {String}
     */
    this.contextId = contextId;
  }

  /**
   * Retrieves project context.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("projectContext", this.project.projectId, this.contextId)
      },
      options
    );
  }

  /**
   * Updates current context
   *
   * @param {String} name                 Context name
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  edit(name, options = {}) {
    return this.tenant.execute(
      requests.editProjectContext(this.project.projectId, this.contextId, name),
      options
    );
  }

  /**
   * Delete current context
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteProjectContext(this.project.projectId, this.contextId),
      options
    );
  }

  /**
   * Provides access to project context events.
   *
   * @return {ProjectContextEvents}
   */
  events() {
    return new ProjectContextEvents(this.tenant, this.project, this.contextId);
  }
}