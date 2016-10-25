"use strict";

import endpoint from "./endpoint";
import BoutEvent from "./bout-event";

/**
 * Abstract representation of a bout.
 */
export default class BoutEvents {

  /**
   * Constructor.
   *
   * @param  {Tenant}  tenant     The tenant instance.
   */
  constructor(tenant) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The event source of bout updates
     *
     * The remote part of the url has to be explicitly appended, otherwise the event source will be creates on the same origin.
     *
     * @type {EventSource}
     * */
    this.eventSource = new EventSource(this.tenant.client.remote + endpoint("boutsEvents"), {withCredentials: true});

    /**
     * Event types enum.
     * @type {BoutEvent}
     */
    this.type = BoutEvent;
  }

  /**
   * Listen to the specified event.
   * @param {BoutEvent} event to listen on.
   * @param {BoutEvent.eventCallback} listener
   */
  on(event, listener) {
    this.eventSource.addEventListener(event.bout, listener, false);
  }

  /**
   * Closes the event source from the client.
   */
  close() {
    this.eventSource.close();
  }
}
