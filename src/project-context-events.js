"use strict";

import endpoint from "./endpoint";
import ProjectContextEvent from "./project-context-event";

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


    //The remote part of the url has to be explicitly appended, otherwise the event source will be creates on the same origin.
    sessionStorage.sseUrl = this.tenant.client.remote + endpoint("projectContextEvents", this.project.projectId, this.contextId);
    this.createConnection();


    /**
     * Event types enum.
     * @type {ProjectContextEvent}
     */
    this.type = ProjectContextEvent;

    this.keepAliveTimer = null;

    this.eventSource.onmessage = (e) => {
      this.getAlive();
      console.log(e.data);
    };

    this.eventSource.onerror = (e) => {
      console.log(e.data);
    };

  }

  /**
   * The event source of context updates
   * @type {EventSource}
   * */
  createConnection() {
    this.eventSource = new EventSource(sessionStorage.sseUrl, {withCredentials: true});
  }

  getAlive(){
    if (this.keepAliveTimer != null) {
      clearTimeout(this.keepAliveTimer);
    }
    this.keepAliveTimer = setTimeout(this.createConnection.bind(this), 6000);
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
}
