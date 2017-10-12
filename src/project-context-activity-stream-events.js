"use strict";

import endpoint from "./endpoint";
import ResumableEventSource from "./resumable-event-source";
import ActivityStreamEvent from "./activity-stream-event";

/**
 * Abstract representation of an project-context activity-stream.
 */
export default class ProjectContextActivityStreamEvents extends ResumableEventSource {

  /**
   * Constructor.
   *
   * @param  {Tenant}  tenant                 The tenant instance.
   * @param  {ProjectContext} projectContext  The projectContext instance.
   */
  constructor(tenant, projectContext) {
    super(tenant.client.remote + endpoint("projectContextActivityStreamEvents", projectContext.contextId));

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The projectContext.
     * @type {ProjectContext}
     */
    this.projectContext = projectContext;

    /**
     * Event types enum.
     * @type {ActivityStreamEvent}
     */
    this.type = ActivityStreamEvent;
  }
}
