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
  constructor(tenant) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;
  }

  /**
   * Retrieves the list of team invitations in the current team.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("teamInvitations")}, options)
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
   * @param  {String} orgId              The id of the organization.
   * @param  {String} teamId             The id of the team.
   * @return {TeamInvitation}
   */
  teamInvitation(orgId, teamId, invitationId) {
    return new TeamInvitation(this.tenant, orgId, teamId, invitationId);
  }

  /**
   * Creates the team invitation with the specified properties.
   *
   * @param  {String}  name           The name of the organization.
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  create(orgId, teamId, emailAddress, options = {}) {
    return this.tenant.execute(
      requests.sentTeamInvitation(orgId, teamId, emailAddress),
      options
    );
  }

  /**
   * Accept the given invitation Id.
   *
   * @param  {String}  invitationId   The Id of the invitation to accept.
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  accept(invitationId, options = {}) {
    return this.tenant.execute(
      requests.acceptTeamInvitation(invitationId),
      options
    );
  }
}
