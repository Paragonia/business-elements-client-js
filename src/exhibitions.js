"use strict";

import endpoint from "./endpoint";
import Exhibition from "./exhibition";
import * as requests from "./requests";

/**
 * Abstract representation of exhibitions.
 */
export default class Exhibitions {

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
   * Retrieves the list of exhibitions in the current tenant.
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("exhibitions")}, options)
      .then((response) => {
        const embedded = response["_embedded"];
        if (embedded) {
          const exhibitions = embedded["be:exhibition"];
          if (exhibitions) {
            return exhibitions;
          }
        }
        return [];
      });
  }

  /**
   * Retrieves the list of exhibitions in the current tenant.
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  listPublic(options = {}) {
    return this.tenant.execute({path: endpoint("publicExhibitions")}, options)
      .then((response) => {
        const embedded = response["_embedded"];
        if (embedded) {
          const exhibitions = embedded["be:exhibition"];
          if (exhibitions) {
            return exhibitions;
          }
        }
        return [];
      });
  }

  /**
   * Retrieve a value object to perform operations on it.
   *
   * @param  {String} id              The id of the value.
   * @return {Exhibition}
   */
  exhibition(id) {
    return new Exhibition(this.tenant, id);
  }

  /**
   * Creates the value with the specified properties.
   *
   * @param  {String}  projectId  The project id.
   * @param {Object} name         The name of the exhibition
   * @param {Object} description  The description of the exhibition
   * @param {Object} pictureUri   The pictureUri of the exhibition
   * @param  {Object} options     The options object.
   * @return {Promise<Object, Error>}
   */
  create(projectId, name, description, pictureUri, options = {})
  {
    return this.tenant.execute(
      requests.createExhibition(projectId, name, description, pictureUri),
      options
    );
  }

}

