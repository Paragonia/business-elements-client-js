"use strict";

import ProjectTeam from "./project-team";
import * as requests from "./requests";
import endpoint from "./endpoint";

/**
 * Abstract representation of project team.
 */
export default class ProjectTeams {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant The tenant instance.
   * @param  {OrganizationProject} project The project instance.
   */
  constructor(tenant, project) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The project
     * @type {OrganizationProject}
     */
    this.project = project;
  }

  /**
   * Retrieves the list of project teams for the current project.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({
      path: endpoint(
        "organizationProjectTeams",
        this.project.organization.organizationId,
        this.project.projectId
      )
    }, options)
      .then((response) => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:organization_project_teams"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve a project team object to perform operations on it.
   *
   * @param  {String} teamId The id of the project team.
   * @return {ProjectTeam}
   */
  projectTeam(teamId) {
    return new ProjectTeam(this.tenant, this.project, teamId);
  }

  /**
   *  Create a new team for the current project
   *
   * @param  {String} teamId The team to assign to the project.
   * @param  {String} permission The permission of the project team.
   * @param {Object} options    The options object
   * @returns {Promise.<Object, Error>}
   */
  create(teamId, permission, options = {}) {
    return this.tenant.execute(
      requests.createOrganizationProjectTeam(
        this.project.organization.organizationId,
        this.project.projectId,
        teamId,
        permission),
      options
    );
  }
}
