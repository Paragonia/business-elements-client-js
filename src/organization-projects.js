"use strict";

import endpoint from "./endpoint";
import OrganizationProject from "./organization-project";
import * as requests from "./requests";

/**
 * Abstract representation of projects.
 */
export default class OrganizationProjects {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant                 The tenant instance.
   * @param  {Organization} organization     The organization these projects belong to.
   */
  constructor(tenant, organization) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The organization which contains the projects.
     * @type {Organization}
     */
    this.organization = organization;
  }

  /**
   * Retrieves the list of projects in the current tenant.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("organizationProjects", this.organization.organizationId)}, options)
      // return empty string when response is missing certain fields to help client logic
      .then((response) => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:organization_project"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve a project object to perform operations on it.
   *
   * @param  {String} id The id of the project.
   * @return {OrganizationProject}
   */
  project(id) {
    return new OrganizationProject(this.tenant, this.organization, id);
  }

  /**
   * Creates the project with the specified properties.
   *
   * @param  {String}  name         The name of the project.
   * @param {String} description    The description of the project
   * @param  {Object} options       The options object.
   * @return {Promise<Object, Error>}
   */
  create(name, description, options = {}) {
    return this.tenant.execute(
      requests.createOrganizationProject(this.organization.organizationId, name, description),
      options
    );
  }
}
