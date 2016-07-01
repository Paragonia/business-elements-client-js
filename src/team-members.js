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
   * @param  {Team} team     The team this object belongs to
   */
  constructor(tenant, team) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The team of this member.
     * @type {Tenant}
     */
    this.team = team;
  }

  /**
   * Retrieves the list of team members in the current team.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("teamMembers", this.team.organizationId, this.team.teamId)}, options)
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
   * @param  {String} memberId           The member id
 * @return {TeamMember}
   */
  member(memberId) {
    return new TeamMember(this.tenant, this.team.organizationId, this.team.teamId, memberId);
  }

  /**
   * Creates the team member with the specified properties.
   *
   * @param  {String} emailAddress   The email address for the team member
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  create(emailAddress, options = {}) {
    return this.tenant.execute(
      requests.addTeamMember(this.team.organizationId, this.team.teamId, emailAddress),
      options
    );
  }
}
