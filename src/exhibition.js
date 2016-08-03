"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";

/**
 * Abstract representation of a exhibition.
 */
export default class Exhibition {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant     The tenant instance.
   * @param  {String} exhibitionId  The exhibition id.
   */
  constructor(tenant, exhibitionId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The value id.
     * @type {String}
     */
    this.exhibitionId = exhibitionId;
  }

  /**
   * Retrieves exhibition.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("exhibition", this.exhibitionId)
      },
      options
    );
  }

  /**
   * Updates the value with the specified properties.
   *
   * @param  {String}  exhibitionId        The exhibition id.
   * @param {String} visibility    The exhibition visibility
   * @param  {Object} options       The options object.
   * @return {Promise<Object, Error>}
   */
  changeExhibitionVisibility(visibility, options = {})
  {
    return this.tenant.execute(
      requests.changeExhibitionVisibility(this.exhibitionId, visibility),
      options
    );
  }

  /**
   * Delete current exhibition
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteExhibition(this.exhibitionId),
      options
    );
  }

}



