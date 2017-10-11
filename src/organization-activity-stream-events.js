"use strict";

import endpoint from "./endpoint";
import ResumableEventSource from "./resumable-event-source";
import ActivityStreamEvent from "./activity-stream-event";

/**
 * Abstract representation of an organization activity-stream.
 */
export default class OrganizationActivityStreamEvents extends ResumableEventSource {

  /**
   * Constructor.
   *
   * @param  {Tenant}  tenant               The tenant instance.
   * @param  {Organization} organization    The organization instance.
   */
  constructor(tenant, organization) {
    super(tenant.client.remote + endpoint("organizationActivityStreamEvents", organization.organizationId));

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The organization.
     * @type {Organization}
     */
    this.organization = organization;

    /**
     * Event types enum.
     * @type {ActivityStreamEvent}
     */
    this.type = ActivityStreamEvent;
  }
}
