"use strict";

import endpoint from "./endpoint";
import Capture from "./capture";
import * as requests from "./requests";

/**
 * Abstract representation of captures.
 */
export default class Captures {

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
   * Retrieves the list of captures in the current tenant.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("captures")}, options)
      .then((response) => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:capture"];
        } else {
          return [];
        }
      });
  }

  /**
   * Retrieve a capture object to perform operations on it.
   *
   * @param  {String} id The id of the capture.
   * @return {Capture}
   */
  capture(id) {
    return new Capture(this.tenant, id);
  }

  /**
   * Creates the capture with the specified properties.
   *
   * @param  {String}  description          The optional description of the capture.
   * @param {Object}   media                Media object
   * @param {Object}   media.type           Media object type
   * @param  {Object} options               The options object.
   * @return {Promise<Object, Error>}
   */
  create(description, media, options = {}) {
    return this.tenant.execute(
      requests.createCapture(description, media),
      options
    );
  }
}
