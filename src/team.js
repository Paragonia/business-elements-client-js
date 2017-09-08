"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";
import TeamMembers from "./team-members";
import TeamInvitations from "./team-invitations";

/**
 * Abstract representation of a selected organization.
 */
export default class Team {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant                The tenant instance.
   * @param  {String} organizationId        The organization id of which this teams belongs.
   * @param  {String} teamId                The team id.
   */
  constructor(tenant, organizationId, teamId) {

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

  }

  /**
   * Retrieves the team.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("team", this.organizationId, this.teamId)
      },
      options
    );
  }

  /**
   * Updates current team
   *
   * @param {String} name                 Team name
   * @param {String} description          Team description
   * @param {String} visibility           Team visibility.
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  edit(name,
       description,
       visibility,
       options = {}) {
    return this.tenant.execute(
      requests.updateTeam(this.organizationId, this.teamId, name, description, visibility),
      options
    );
  }

  /**
   * Set owner team
   *
   * @param  {Boolean}  isOwnerTeam        True if is the owner team of the organization.
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  specifyOwnerTeam(isOwnerTeam, options = {}) {
    return this.tenant.execute(
      requests.specifyOwnerTeam(this.organizationId, this.teamId, isOwnerTeam),
      options
    );
  }

  /**
   * Delete current team
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteTeam(this.organizationId, this.teamId),
      options
    );
  }

  /**
   * Provides access to team member.
   *
   * @return {TeamMembers}
   */
  members() {
    return new TeamMembers(this.tenant, this);
  }

  /**
   * Provides access to team invitation.
   *
   * @return {TeamInvitations}
   */
  invitations() {
    return new TeamInvitations(this.tenant, this);
  }

}
