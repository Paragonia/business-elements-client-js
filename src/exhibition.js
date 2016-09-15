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
   * @param  {String} exhibitionId  The exhibition id.
   * @param {String} visibility     The exhibition visibility
   * @param  {Object} options       The options object.
   * @return {Promise<Object, Error>}
   */
  changeExhibitionVisibility(visibility, options = {}) {
    return this.tenant.execute(
      requests.changeExhibitionVisibility(this.exhibitionId, visibility),
      options
    );
  }

  /**
   * Updates the description of the exhibition.
   *
   * @param {String} exhibitionId   The exhibition id.
   * @param {String} description    The exhibition description.
   * @param  {Object} options       The options object.
   * @return {Promise<Object, Error>}
   */
  changeExhibitionDescription(description, options = {}) {
    return this.tenant.execute(
      requests.changeExhibitionDescription(this.exhibitionId, description),
      options
    );
  }

  /**
   * Updates the value with the specified properties.
   *
   * @param  {String} exhibitionId  The exhibition id.
   * @param {String} pictureUri     The exhibition picture.
   * @param  {Object} options       The options object.
   * @return {Promise<Object, Error>}
   */
  changeExhibitionPicture(pictureUri, options = {}) {
    return this.tenant.execute(
      requests.changeExhibitionPicture(this.exhibitionId, pictureUri),
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

  /**
   * Retrieves exhibition instances.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  getPublishedInstances(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("exhibitionInstances", this.exhibitionId)
      },
      options
    ).then((response) => {
      if (response["_embedded"]) {
        return response["_embedded"]["be:instance"];
      } else {
        return [];
      }
    });
  }

  /**
   * Retrieves exhibition instances.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  getPublishedInstance(instanceId, options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("exhibitionInstance", this.exhibitionId, instanceId)
      },
      options
    )
  }
}



