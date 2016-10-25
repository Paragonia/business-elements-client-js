import endpoint from "./endpoint";
import BoutEvents from "./bout-events";
import * as requests from "./requests";

/**
 * Abstract representation of bouts.
 */
export default class Bouts {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant The tenant instance.
   */
  constructor(tenant) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;
  }

  /**
   * Provides access to bouts events.
   *
   * @return {BoutEvents}
   */
  events() {
    return new BoutEvents(this.tenant);
  }

}
