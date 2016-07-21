"use strict";

import * as requests from "./requests";

/**
 * Abstract representation of invitation
 */
export default class Invitation {

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
   * Accept the invitation Id.
   *
   * @param  {String} invitationId to be accepted
   * @param  {String} emailAddress Address which received the invitation
   * @param  {String} password for the created account.
   * @param  {Object} options The options object.
   * @return {Promise<Object, Error>}
   */
  acceptTeamMemberInvitation(invitationId, emailAddress, password, options = {}) {
    return this.tenant.execute(
      requests.acceptTeamMemberInvitation(invitationId, emailAddress, password),
      options
    );
  }

}
