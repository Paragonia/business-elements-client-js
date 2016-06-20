"use strict";

import endpoint from "./endpoint";

/**
 * Abstract representation of a project.
 */
export default class ProjectContextEvents {

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

    /**
     * Construct the event source to start consuming events straight away.
     * @type {EventSource}
     */
    this.eventSource = new EventSource(endpoint("projectContextEvents", this.project.projectId, this.contextId));
  }

  /**
   * Listen to the specified event.
   * @param {ProjectContextEvent} event to listen on.
   * @param {ProjectContextEvents.eventCallback} listener
   */
  on(event, listener) {
    this.eventSource.addEventListener(event.value, listener);
  }

  /**
   * Closes the event source from the client.
   */
  close() {
    this.eventSource.close();
  }

  /**
   * Callback to handle the SSE event.
   * @callback ProjectContextEvents~eventCallback
   * @param {Object} event.
   */
}
