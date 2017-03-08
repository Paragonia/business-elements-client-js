"use strict";

import ApplicationForm from "./application-form";
import endpoint from "./endpoint";
import * as requests from "./requests";


/**
 * Abstract representation of Application Forms.
 */
export default class ApplicationForms {

  /**
   * Constructor.
   *
   * @param   {Tenant}      tenant          The tenant instance.
   * @param   {Application} application     The application instance
   */
  constructor(tenant, application) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The application
     * @type {Application}
     */
    this.application = application;
  }

  /**
   * Retrieves the list of forms for the current application
   *
   * @param {Object} options          The options object
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("applicationForms", (this.application.applicationHandle))}, options)
      .then(response => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:application_form"];
        } else {
          return [];
        }
      });
  }

  /**
   * Creates a new application form
   *
   * @param {String} formHandle         The form handle
   * @param {String} formDescription    The form description(optional)
   * @param {Object} options            The options object
   * @returns {Promise.<Object, Error>}
   */
  create(formHandle, formDescription, options) {
    return this.tenant.execute(
      requests.createApplicationForm(this.application.applicationHandle, formHandle, formDescription),
      options
    );
  }

  /**
   * Retrieves an application form object
   *
   * @param {String}              formHandle The handle of the application form
   * @returns {ApplicationForm}
   */
  form(formHandle) {
    return new ApplicationForm(this.tenant, this.application, formHandle);
  }
}
