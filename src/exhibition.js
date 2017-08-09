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
   * @param {String} name           The exhibition name.
   * @param {String} description    The exhibition description.
   * @param {String} pictureUri     The exhibition picture.
   * @param  {Object} options       The options object.
   * @return {Promise<Object, Error>}
   */
  update(name, description, pictureUri, options = {}) {
    return this.tenant.execute(
      requests.updateExhibition(this.exhibitionId, name, description, pictureUri),
      options
    );
  }

  /**
   * Assign project to the exhibition.
   *
   * @param {String} projectId    The id of project to assign.
   * @param {Object} options      The options object.
   */
  assignProjectToExhibition(projectId, options = {}) {
    return this.tenant.execute({
      method: "PUT",
      path: endpoint("exhibitionProject", this.exhibitionId),
      body: {
        projectId
      }
    }, options);
  }

  /**
   * Remove assigned project from the exhibition.
   *
   * @param {String} projectId  The id of project to remove.
   * @param {Object} options    The options object
   */
  removeProjectFromExhibition(projectId, options = {}) {
    return this.tenant.execute({
      method: "DELETE",
      path: endpoint("exhibitionProject", this.exhibitionId),
      body: {
        projectId
      }
    }, options);
  }

  /**
   * Assign project context to the exhibition.
   *
   * @param {String} projectContextId    The id of project context to assign.
   * @param {Object} options             The options object.
   */
  assignProjectContextToExhibition(projectContextId, options = {}) {
    return this.tenant.execute({
      method: "PUT",
      path: endpoint("exhibitionProjectContext", this.exhibitionId),
      body: {
        projectContextId
      }
    }, options);
  }

  /**
   * Remove assigned project context from the exhibition.
   *
   * @param {String} projectContextId  The id of project context to remove.
   * @param {Object} options           The options object
   */
  removeProjectContextFromExhibition(projectContextId, options = {}) {
    return this.tenant.execute({
      method: "DELETE",
      path: endpoint("exhibitionProjectContext", this.exhibitionId),
      body: {
        projectContextId
      }
    }, options);
  }

  /**
   * Retrieves the list of project contexts for the current exhibition.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  listProjectContexts(options = {}) {
    return this.tenant.execute({path: endpoint("exhibitionProjectContexts", this.exhibitionId)}, options)
      .then((response) => {
        if (response["_embedded"]) {
          return response["_embedded"]["be:project_context"];
        } else {
          return [];
        }
      });
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
   * Retrieve exhibition content root.
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  getContentRoot(options = {}) {
    return this.tenant.execute({path: endpoint("exhibitionContentRoot", this.exhibitionId)}, options)
      .then((response) => {
        return response;
      });
  }

  /**
   * Retrieve exhibition content TOC.
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  getContentToc(options = {}) {
    return this.tenant.execute({path: endpoint("exhibitionContentToc", this.exhibitionId)}, options)
      .then((response) => {
        return response;
      });
  }

  /**
   * Retrieve exhibition content menu.
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  getContentMenu(organizationId, options = {}) {
    return this.tenant.execute({path: endpoint("exhibitionContentMenu", organizationId)}, options)
      .then((response) => {
        return response;
      });
  }

  /**
   * Retrieve exhibition content, the non-cached version.
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  getContentRootNoCache(options = {}) {
    return this.tenant.execute({path: endpoint("exhibitionContentRootNoCache", this.exhibitionId)}, options)
      .then((response) => {
        return response;
      });
  }

  /**
   * Retrieve the content-items configured for the exhibition.
   * @param  {Object} options         The options object.
   * @returns {Promise.<TResult>}
   */
  getContentItems(options = {}) {
    return this.tenant.execute({path: endpoint("exhibitionContentItems", this.exhibitionId)}, options)
      .then((response) => {
        return response;
      });
  }

  /**
   * Store the provided content-items
   * @param items                     The content-items to store.
   * @param  {Object} options         The options object.
   * @returns {Promise.<Object, Error>}
   */
  setContentItems(items, options = {}) {
    return this.tenant.execute({
      method: "PUT",
      path: endpoint("exhibitionContentItems", this.exhibitionId),
      body: {
        items
      }
    }, options);
  }
}



