"use strict";

import endpoint from "./endpoint";
import TeamMember from "./team-member";
import * as requests from "./requests";

/**
 * Abstract representation of organizations.
 */
export default class TeamMembers {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant The tenant instance.
   */
  constructor(tenant) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;
  }

  /**
   * Retrieves the list of team members in the current team.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("teamMembers")}, options)
      // return empty string when response is missing certain fields to help client logic
      .then((response) => {
        if (response && response["_embedded"]) {
          return response["_embedded"]["be:teamMembers"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve an team member to perform operations on it.
   *
   * @param  {String} orgId              The id of the organization.
   * @param  {String} teamId             The id of the team.
   * @return {TeamMember}
   */
  teamMember(orgId, teamId, memberId) {
    return new TeamMember(this.tenant, orgId, teamId, memberId);
  }

  /**
   * Creates the team member with the specified properties.
   *
   * @param  {String}  name           The name of the organization.
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  create(orgId, teamId, emailAddress, options = {}) {
    return this.tenant.execute(
      requests.addTeamMember(orgId, teamId, emailAddress),
      options
    );
  }
}
