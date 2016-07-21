"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";

/**
 * Abstract representation of a selected team invitation.
 */
export default class TeamInvitation {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant                The tenant instance.
   * @param  {String} organizationId        The organization id of which this teams belongs.
   * @param  {String} teamId                The team id for which invitations have been sent.
   * @param  {String} invitationId          The invitation id.
   */
  constructor(tenant, organizationId, teamId, invitationId) {

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

    /**
     * The team id.
     * @type {String}
     */
    this.teamId = teamId;

    /**
     * The invitation id.
     * @type {String}
     */
    this.invitationId = invitationId;
  }

  /**
   * Retrieves the team invitation.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options={}) {
    return this.tenant.execute(
      {
        path: endpoint("teamInvitation", this.organizationId, this.teamId, this.invitationId)
      },
      options
    );
  }

  /**
   * Delete current team invitation
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteTeamInvitation(this.organizationId, this.teamId, this.invitationId),
      options
    );
  }
}
