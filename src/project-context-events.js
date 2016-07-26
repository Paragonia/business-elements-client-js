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
     * The event source of context updates
     *
     * The remote part of the url has to be explicitly appended, otherwise the event source will be creates on the same origin.
     *
     * @type {EventSource}
     * */
    this.eventSource = new EventSource(this.tenant.client.remote + endpoint("projectContextEvents", this.project.projectId, this.contextId), { withCredentials: true } );
  }

  /**
   * Listen to the specified event.
   * @param {ProjectContextEvent} event to listen on.
   * @param {ProjectContextEvents.eventCallback} listener
   */
  on(event, listener) {
    this.eventSource.addEventListener(event.value, listener, false);
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
