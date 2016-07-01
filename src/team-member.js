"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";

/**
 * Abstract representation of a selected team member.
 */
export default class TeamMember {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant                The tenant instance.
   * @param  {String} organizationId        The organization id of which this teams belongs.
   * @param  {String} teamId                The team id of which this member belongs to.
   * @param  {String} memberId              The member id.
   */
  constructor(tenant, organizationId, teamId, memberId) {

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
     * The member id.
     * @type {String}
     */
    this.memberId = memberId;
  }

  /**
   * Retrieves the team member.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options={}) {
    return this.tenant.execute(
      {
        path: endpoint("teamMember", this.organizationId, this.teamId, this.memberId)
      },
      options
    );
  }

  /**
   * Delete current team member
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteTeamMember(this.organizationId, this.teamId, this.memberId),
      options
    );
  }

}
