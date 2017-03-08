"use strict";

import ExhibitionTeam from "./exhibition-team";
import * as requests from "./requests";
import endpoint from "./endpoint";

/**
 * Abstract representation of exhibition team.
 */
export default class ExhibitionTeams {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant The tenant instance.
   * @param  {OrganizationExhibition} exhibition The exhibition instance.
   */
  constructor(tenant, exhibition) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The exhibition
     * @type {OrganizationExhibition}
     */
    this.exhibition = exhibition;
  }

  /**
   * Retrieves the list of exhibition teams for the current exhibition.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({
      path: endpoint(
        "organizationExhibitionTeams",
        this.exhibition.organization.organizationId,
        this.exhibition.exhibitionId
      )
    }, options)
      .then((response) => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:organization_exhibition_team"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve a exhibition team object to perform operations on it.
   *
   * @param  {String} teamId The id of the exhibition team.
   * @return {ExhibitionTeam}
   */
  team(teamId) {
    return new ExhibitionTeam(this.tenant, this.exhibition, teamId);
  }

  /**
   *  Create a new team for the current exhibition
   *
   * @param  {String} teamId The team to assign to the exhibition.
   * @param  {String} permission The permission of the exhibition team.
   * @param {Object} options    The options object
   * @returns {Promise.<Object, Error>}
   */
  create(teamId, permission, options = {}) {
    return this.tenant.execute(
      requests.createOrganizationExhibitionTeam(
        this.exhibition.organization.organizationId,
        this.exhibition.exhibitionId,
        teamId,
        permission),
      options
    );
  }
}
