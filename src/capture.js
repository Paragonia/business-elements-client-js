"use strict";

import endpoint from "./endpoint";
import CaptureMedias from "./capture-medias";

/**
 * Abstract representation of a capture.
 */
export default class Capture {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant     The tenant instance.
   * @param  {String} captureId  The capture id.
   */
  constructor(tenant, captureId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The capture id.
     * @type {String}
     */
    this.captureId = captureId;
  }

  /**
   * Retrieves capture.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("capture", this.captureId)
      },
      options
    );
  }

  /**
   * Provides access to capture medias.
   *
   * @return {CaptureMedias}
   */
  medias() {
    return new CaptureMedias(this.tenant, this);
  }
}
