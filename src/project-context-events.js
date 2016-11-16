"use strict";

import endpoint from "./endpoint";
import ProjectContextEvent from "./project-context-event";
import ResumableEventSource from "./resumable-event-source";

/**
 * Abstract representation of a project.
 */
export default class ProjectContextEvents extends ResumableEventSource {

  /**
   * Constructor.
   *
   * @param  {Tenant}  tenant     The tenant instance.
   * @param  {Project} project    The project instance.
   * @param  {String}  contextId  The context id.
   */
  constructor(tenant, project, contextId) {
    super(tenant.client.remote + endpoint("projectContextEvents", project.projectId, contextId));

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

    /**
     * Event types enum.
     * @type {ProjectContextEvent}
     */
    this.type = ProjectContextEvent;
  }
}
