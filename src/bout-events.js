"use strict";

import endpoint from "./endpoint";
import BoutEvent from "./bout-event";
import ResumableEventSource from "./resumable-event-source";

/**
 * Abstract representation of a bout.
 */
export default class BoutEvents extends ResumableEventSource {

  /**
   * Constructor.
   *
   * @param  {Tenant}  tenant     The tenant instance.
   */
  constructor(tenant) {
    super(tenant.client.remote + endpoint("boutsEvents"));

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * Event types enum.
     * @type {BoutEvent}
     */
    this.type = BoutEvent;
  }
}
