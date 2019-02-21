"use strict";

import endpoint from "./endpoint";
import Teams from "./teams";
import * as requests from "./requests";
import OrganizationProjects from "./organization-projects";
import OrganizationExhibitions from "./organization-exhibitions";
import ContactMethod from "./contact-method";

/**
 * Abstract representation of a selected organization.
 */
export default class Organization {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant                The tenant instance.
   * @param  {String} organizationId        The organization id.
   */
  constructor(tenant, organizationId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The organization id.
     * @type {String}
     */
    this.organizationId = organizationId;
  }

  /**
   * Retrieves organization.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("organization", this.organizationId)
      },
      options
    );
  }

  /**
   * Retrieves organization changes.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  changes(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("organizationChanges", this.organizationId)
      },
      options
    );
  }

  /**
   * Delete current organization
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteOrganization(this.organizationId),
      options
    );
  }

  /**
   * Update current organization
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  update(name, options = {}) {
    return this.tenant.execute(
      requests.updateOrganization(this.organizationId, name),
      options
    );
  }

  /**
   * Change current organization logo
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  changeLogo(pictureUri, options = {}) {
    return this.tenant.execute(
      requests.changeOrganizationLogo(this.organizationId, pictureUri),
      options
    );
  }

  /**
   * Request touches
   *
   * @param methodType      {String}  the method of contact.
   * @param methodValue     {String}  the contact detail.
   * @param requestMessage  {String}  the request message.
   * @param options         {Object}  the options object.
   * @returns {Promise.<Object, Error>}
   */
  requestTouches(methodType, methodValue, requestMessage, options = {}) {
    let data, type;
    if (ContactMethod.EMAIL.name === methodType) {
      data = {emailAddress: methodValue};
      type = methodType;
    } else {
      throw new Error("The provided methodType " + methodType + " is unknown.");
    }
    if (!methodValue) {
      throw new Error("The methodValue is required.");
    }

    const contactMethod = {
      "type": type,
      "data": data
    };

    return this.tenant.execute(
      {
        method: "POST",
        path: endpoint("organizationTouches", this.organizationId),
        body: {
          contactMethod,
          requestMessage
        }
      },
      options
    );
  }

  /**
   * Provides access to project contexts.
   *
   * @return {Teams}
   */
  teams() {
    return new Teams(this.tenant, this);
  }

  projects() {
    return new OrganizationProjects(this.tenant, this);
  }

  exhibitions() {
    return new OrganizationExhibitions(this.tenant, this);
  }
}
