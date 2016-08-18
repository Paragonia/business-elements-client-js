"use strict";

import endpoint from "./endpoint";
import CaptureMedia from "./capture-media";
import * as requests from "./requests";

/**
 * Abstract representation of capture medias.
 */
export default class CaptureMedias {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant The tenant instance.
   * @param  {Capture} capture The capture instance.
   */
  constructor(tenant, capture) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The capture
     * @type {Capture}
     */
    this.capture = capture;
  }

  /**
   * Retrieves the list of capture medias for the current capture.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("captureMedias", this.capture.captureId)}, options)
      .then((response) => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:capture_media"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve a capture media object to perform operations on it.
   *
   * @param  {String} id The id of the capture media.
   * @return {CaptureMedia}
   */
  media(id) {
    return new CaptureMedia(this.tenant, this.capture, id);
  }

  /**
   * Add capture-media with the specified properties.
   *
   * @param {Object}   media                Media object
   * @param  {Object} options               The options object.
   * @return {Promise<Object, Error>}
   */
  add(media, options = {}) {
    return this.tenant.execute(
      requests.addCaptureMedia(this.capture.captureId, media),
      options
    ).then((response) => {
      if (response["_embedded"]) {
        return response["_embedded"]["be:capture_media"];
      } else {
        return [];
      }
    });
    
  }
}
