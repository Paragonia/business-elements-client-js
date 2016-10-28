import BoutEvents from "./bout-events";
import Bout from "./bout";

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

  /**
   * Retrieve a bout object to perform operations on it.
   *
   * @param  {String} id        The id of the bout.
   * @return {Bout}
   */
  bout(id) {
    return new Bout(this.tenant, id);
  }

}
