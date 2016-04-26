/**
 * Abstract representation of a project.
 *
 */
export default class Project {

  /**
   * Constructor.
   *
   * @param  {BusinessElementsClient} client     The client instance.
   * @param  {String}      projectId             The project id.
   * @param  {Object}      options.headers       The headers object option.
   */
  constructor(client, projectId, options={}) {
    /**
     * @ignore
     */
    this.client = client;

    /**
     * The project id.
     * @type {String}
     */
    this.projectId = projectId;

    /**
     * The default options object.
     * @ignore
     * @type {Object}
     */
    this.options = options;

  }

  /**
   * Merges passed request options with default project ones, if any.
   *
   * @private
   * @param  {Object} options The options to merge.
   * @return {Object}         The merged options.
   */
  _getProjectOptions(options={}) {
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

  // TODO [AK] List resources
}
