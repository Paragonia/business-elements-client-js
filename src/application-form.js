"use strict";

/**
 * Abstract representation of an application form.
 */
export default class ApplicationForm {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant                  The tenant instance.
   * @param  {String} applicationFormHandle   The application form handle.
   */
  constructor(tenant, applicationFormHandle) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The application form handle.
     * @type {String}
     */
    this.applicationFormHandle = applicationFormHandle;
  }
}
