"use strict";

import endpoint from "./endpoint";
import ExhibitionTeams from "./exhibition-teams";

/**
 * Abstract representation of a organization exhibition.
 */
export default class OrganizationExhibition {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant     The tenant instance.
   * @param  {Organization} organization   The organization instance.
   * @param  {String} exhibitionId  The exhibition id.
   */
  constructor(tenant, organization, exhibitionId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The organization id.
     * @type {Organization}
     */
    this.organization = organization;

    /**
     * The value id.
     * @type {String}
     */
    this.exhibitionId = exhibitionId;
  }

  /**
   * Retrieves exhibition access.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  getAccess(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("organizationExhibition", this.organization.organizationId, this.exhibitionId)
      },
      options
    );
  }


  /**
   * Updates team access of the exhibition.
   *
   * @param  {Object} options       The options object.
   * @return {Promise<Object, Error>}
   */
  updateAccess(options = {}) {
    return this.tenant.execute(
      {
        method: "PUT",
        path: endpoint("organizationExhibition", this.organization.organizationId, this.exhibitionId),
        body: {}
      },
      options
    );
  }

  teams() {
    return new ExhibitionTeams(this.tenant, this);
  }
}



