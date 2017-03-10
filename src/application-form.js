"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";


/**
 * Abstract representation of an application form.
 */
export default class ApplicationForm {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant                  The tenant instance.
   * @param application                       The application instance
   * @param  {String} applicationFormHandle   The application form handle.
   */
  constructor(tenant, application, applicationFormHandle) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The application
     * @type{Application}
     */
    this.application = application;

    /**
     * The application form handle.
     * @type {String}
     */
    this.applicationFormHandle = applicationFormHandle;
  }

  /**
   * Retrieve application form
   *
   * @param options
   * @returns {Promise.<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("applicationForm", this.application.applicationHandle, this.applicationFormHandle),
        options
      }
    );
  }

  /**
   * Creates a new form for concept
   *
   * @param {String} conceptId   The concept id
   * @param {Object} form        The form object as json
   * @param {Object} options     The options object
   * @returns {Promise.<Object, Error>}
   */
  createConceptForm(conceptId, form, options = {}) {
    return this.tenant.execute(
      requests.createApplicationConceptForm(this.application.applicationHandle, conceptId, this.applicationFormHandle, form),
      options
    );
  }

  /**
   * Updates the form for concept
   *
   * @param {String} conceptId   The concept id
   * @param {Object} form        The form object as json
   * @param {Object} options     The options object
   * @returns {Promise.<Object, Error>}
   */
  updateConceptForm(conceptId, form, options = {}) {
    return this.tenant.execute(
      requests.updateApplicationConceptForm(this.application.applicationHandle, conceptId, this.applicationFormHandle, form),
      options
    );
  }

  /**
   * Creates a new form for attribute
   *
   * @param {String} attributeId          The attribute id
   * @param {Object} form                 The form object as json
   * @param {Object} options              The options object
   * @returns {Promise.<Object, Error>}
   */
  createAttributeForm(attributeId, form, options = {}) {
    return this.tenant.execute(
      requests.createApplicationAttributeForm(this.application.applicationHandle, attributeId, this.applicationFormHandle, form),
      options
    );
  }

  /**
   * Updates the form for attribute
   *
   * @param {String} attributeId          The attribute id
   * @param {Object} form                 The form object as json
   * @param {Object} options              The options object
   * @returns {Promise.<Object, Error>}
   */
  updateAttributeForm(attributeId, form, options = {}) {
    return this.tenant.execute(
      requests.updateApplicationAttributeForm(this.application.applicationHandle, attributeId, this.applicationFormHandle, form),
      options
    );
  }

}
