"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";
import ProjectTeams from "./project-teams";

/**
 * Abstract representation of a project.
 */
export default class OrganizationProject {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant               The tenant instance.
   * @param  {Organization} organization   The organization instance.
   * @param  {String} projectId            The project id.
   */
  constructor(tenant, organization, projectId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The organization id.
     * @type {Organization}
     */
    this.organization = organization;

    /**
     * The project id.
     * @type {String}
     */
    this.projectId = projectId;
  }

  /**
   * Retrieves project.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("organizationProject", this.organization.organizationId, this.projectId)
      },
      options
    );
  }

  /**
   * Retrieves project changes.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  changes(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("organizationProjectChanges", this.organization.organizationId, this.projectId)
      },
      options
    );
  }

  /**
   * Updates current project
   *
   * @param {String} name                 Project name
   * @param {String} description          Project description
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  edit(name, description, options = {}) {
    return this.tenant.execute(
      requests.editOrganizationProject(this.organization.organizationId, this.projectId, name, description),
      options
    );
  }

  /**
   * Delete current project
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteOrganizationProject(this.organization.organizationId, this.projectId),
      options
    );
  }

  teams() {
    return new ProjectTeams(this.tenant, this);
  }
}
