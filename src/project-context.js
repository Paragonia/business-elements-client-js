"use strict";

import endpoint from "./endpoint";
import ProjectContextEvents from "./project-context-events";
import * as requests from "./requests";
import InteractionContent from "./interaction-content";
import ProjectContextActivityStreamEvents from "./project-context-activity-stream-events";

/**
 * Abstract representation of a project.
 */
export default class ProjectContext {

  /**
   * Constructor.
   *
   * @param  {Tenant}  tenant     The tenant instance.
   * @param  {Project} project    The project instance.
   * @param  {String}  contextId  The context id.
   */
  constructor(tenant, project, contextId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The project.
     * @type {Project}
     */
    this.project = project;

    /**
     * The context.
     * @type {String}
     */
    this.contextId = contextId;
  }

  /**
   * Retrieves project context.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  get(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("projectContext", this.project.projectId, this.contextId)
      },
      options
    );
  }

  /**
   * Updates current context
   *
   * @param {String} name                 Context name
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  edit(name, options = {}) {
    return this.tenant.execute(
      requests.editProjectContext(this.project.projectId, this.contextId, name),
      options
    );
  }

  /**
   * Delete current context
   *
   * @param  {Object} options             The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteProjectContext(this.project.projectId, this.contextId),
      options
    );
  }

  /**
   * Provides access to project context events.
   *
   * @return {ProjectContextEvents}
   */
  events() {
    return new ProjectContextEvents(this.tenant, this.project, this.contextId);
  }

  /**
   * Provides the clusters of a context.
   * @param  {Object} options   The options object.
   */
  clusters(options = {}) {
    return this.tenant.execute(
      requests.getContextClusters(this.project.projectId, this.contextId),
      options
    );
  }

  /**
   * Updates a user's position in a context.
   * @param {Object} position   Cell position
   * @param {Object} options    The options object.
   */
  positionUpdate(position, options = {}) {
    return this.tenant.execute(
      requests.updateContextPosition(this.project.projectId, this.contextId, position),
      options
    );
  }

  /**
   * Publish an interaction of type text on the context.
   * @param {InteractionContent}  content   the content to be sent as interaction
   * @param {Object}              options   the options object
   */
  interact(content, options = {}) {
    // only supports text for now
    const textContent = InteractionContent.getTextInstance(content);

    return this.tenant.execute(
      requests.sendInteraction(this.project.projectId, this.contextId, textContent),
      options
    );
  }

  activityStreams() {
    return new ProjectContextActivityStreamEvents(this.tenant, this);
  }

  limitedActivityStreams(fromTime, options = {}) {
    let path = endpoint("projectContextActivityStreamLimitedEvents", this.project.projectId, this.contextId);
    if (fromTime) {
      path = `${path}?from=${fromTime}`;
    }

    return this.tenant.execute({path: path}, options)
      .then((response) => {
        const embedded = response["_embedded"];
        if (embedded) {
          const activitystreams = embedded["be:activitystream"];
          if (activitystreams) {
            return activitystreams;
          }
        }
        return [];
      });
  }

  activityStreamsSummary(options = {}) {
    let path = endpoint("projectContextActivityStreamSummary", this.project.projectId, this.contextId);
    return this.tenant.execute({path: path}, options);
  }
}
