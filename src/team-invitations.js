"use strict";

import endpoint from "./endpoint";
import TeamInvitation from "./team-invitation";
import * as requests from "./requests";

/**
 * Abstract representation of organizations.
 */
export default class TeamInvitations {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant The tenant instance.
   */
  constructor(tenant, team) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The team associated with this invitation.
     * @type {Tenant}
     */
    this.team = team;
  }

  /**
   * Retrieves the list of team invitations in the current team.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("teamInvitations", this.team.organizationId, this.team.teamId)}, options)
      // return empty string when response is missing certain fields to help client logic
      .then((response) => {
        if (response && response["_embedded"]) {
          return response["_embedded"]["be:teamInvitations"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve an team invitation to perform operations on it.
   *
   * @return {TeamInvitation}
   */
  teamInvitation(invitationId) {
    return new TeamInvitation(this.tenant, this.team.organizationId, this.team.teamId, invitationId);
  }

  /**
   * Creates the team invitation with the specified properties.
   *
   * @param  {String}  emailAddress   The the email address to invite.
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  create(emailAddress, options = {}) {
    return this.tenant.execute(
      requests.sentTeamInvitation(this.team.organizationId, this.team.teamId, emailAddress),
      options
    );
  }
}
