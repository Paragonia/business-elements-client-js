"use strict";

import endpoint from "./endpoint";
import Project from "./project";

/**
 * Abstract representation of a selected tenant.
 *
 */
export default class Projects {
  /**
   * Constructor.
   *
   * @param  {BusinessElementsClient} client     The client instance.
   * @param  {Object}      options.headers       The headers object option.
   */
  constructor(client, options={}) {
    /**
     * @ignore
     */
    this.client = client;

    /**
     * The default options object.
     * @ignore
     * @type {Object}
     */
    this.options = options;
  }

  /**
   * Merges passed request options with default users ones, if any.
   *
   * @private
   * @param  {Object} options The options to merge.
   * @return {Object}         The merged options.
   */
  _getProjectsOptions(options={}) {
    const headers = {
      ...this.options && this.options.headers,
      ...options.headers
    };
    return {
      ...this.options,
      ...options,
      headers
    };
  }

  /**
   * Retrieves the list of projects in the current tenant.
   *
   * @param  {Object} options         The options object.
   * @param  {Object} options.headers The headers object option.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options={}) {
    return this.client.execute({
      path: endpoint("projects"),
      ...this._getProjectsOptions(options)
    });
  }

  /**
   * Retreive a project object to perform operations on it.
   *
   * @param  {String} id              The id of the project.
   * @param  {Object} options         The options object.
   * @return {Project}
   */
  project(id, options) {
    return new Project(this.client, id, this._getProjectsOptions(options));
  }
}
