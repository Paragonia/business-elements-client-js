"use strict";

import * as requests from "./requests";
import endpoint from "./endpoint";

/**
 * Abstract representation of a exhibition team.
 */
export default class ExhibitionTeam {

  /**
   * Constructor.
   *
   * @param  {Tenant}                 tenant     The tenant instance.
   * @param  {OrganizationExhibition} exhibition The exhibition instance.
   * @param  {String}                 teamId      The team id.
   */
  constructor(tenant, exhibition, teamId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The exhibition.
     * @type {Exhibition}
     */
    this.exhibition = exhibition;

    /**
     * The team id.
     * @type {String}
     */
    this.teamId = teamId;
  }

  /**
   * Retrieves exhibition team.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute({
      path: endpoint(
        "organizationExhibitionTeam",
        this.exhibition.organization.organizationId,
        this.exhibition.exhibitionId,
        this.teamId
      )
    }, options);
  }

  /**
   * Updates current exhibition team
   *
   * @param {String} permission           Exhibition team permission
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  edit(permission, options = {}) {
    return this.tenant.execute({
        method: "PUT",
        path: endpoint(
            "organizationExhibitionTeam",
            this.exhibition.organization.organizationId,
            this.exhibition.exhibitionId,
            this.teamId
        ),
        body: {permission}
      },
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
    return this.tenant.execute({
      method: "DELETE",
      path: endpoint(
        "organizationExhibitionTeam",
        this.exhibition.organization.organizationId,
        this.exhibition.exhibitionId,
        this.teamId
      )
    },
      options
    );
  }
}
