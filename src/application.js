"use strict";

import endpoint from "./endpoint";
import ApplicationForms from "./application-forms";

/**
 * Abstract representation of a application.
 */
export default class Application {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant              The tenant instance.
   * @param  {String} applicationHandle   The application handle.
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
   * @param {String}  configHandle    The config handle
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  getConfig(configHandle, options = {}) {
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
   * @param {String}  localizationHandle  The localization handle
   * @param  {Object} options             The options object.
   * @return {Promise<Object, Error>}
   */
  getLocalization(localizationHandle, options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("applicationLocalization", this.applicationHandle, localizationHandle)
      },
      options
    );
  }

  /**
   * Retrieves the list of publication purposes.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  listPublicationPurposes(options = {}) {
    return this.tenant.execute({path: endpoint("applicationPublicationPurposes", this.applicationHandle)}, options)
      .then((response) => {
        return response;
      });
  }

  /**
   * Provides access to application forms
   *
   * @returns {ApplicationForms}
   */
  forms() {
    return new ApplicationForms(this.tenant, this);
  }
}
