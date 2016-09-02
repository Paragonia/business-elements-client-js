"use strict";

import endpoint from "./endpoint";

/**
 * Abstract representation of a application.
 */
export default class Application {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant     The tenant instance.
   * @param  {String} applicationId  The application id.
   */
  constructor(tenant, applicationHandle) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The application id.
     * @type {String}
     */
    this.applicationHandle = applicationHandle;
  }

  /**
   * Retrieves the whole application data (config, forms, localization).
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("application", this.applicationHandle)
      },
      options
    );
  }

  /**
   * Retrieves the application config.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  getConfig(options = {}, configHandle) {
    return this.tenant.execute(
      {
        path: endpoint("applicationConfig", this.applicationHandle, configHandle)
      },
      options
    );
  }

  /**
   * Retrieves the application localization.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  getLocalization(options = {}, localizationHandle) {
    return this.tenant.execute(
      {
        path: endpoint("applicationLocalization", this.applicationHandle, localizationHandle)
      },
      options
    );
  }
}
