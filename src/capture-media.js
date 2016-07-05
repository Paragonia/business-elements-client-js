"use strict";

import endpoint from "./endpoint";

/**
 * Abstract representation of a capture.
 */
export default class CaptureMedia {

  /**
   * Constructor.
   *
   * @param  {Tenant}  tenant     The tenant instance.
   * @param  {Capture} capture    The capture instance.
   * @param  {String}  mediaId  The media id.
   */
  constructor(tenant, capture, mediaId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The capture.
     * @type {Capture}
     */
    this.capture = capture;

    /**
     * The media.
     * @type {String}
     */
    this.mediaId = mediaId;
  }

  /**
   * Retrieves capture media.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("captureMedia", this.capture.captureId, this.mediaId)
      },
      options
    );
  }
}
