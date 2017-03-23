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
   * Retrieves exhibition clusters.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  getPublishedClusters(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("exhibitionClusters", this.exhibitionId)
      },
      options
    ).then((response) => {
      if (response["_embedded"]) {
        response["_embedded"]["be:exhibition_clusters"].forEach((cluster) => {
          cluster.users = response["_embedded"]["be:user"];
        });
        return response["_embedded"]["be:exhibition_clusters"];
      } else {
        return [];
      }
    });
  }

  /**
   * Retrieves exhibition cluster.
   * @param  {String} clusterHeadId      The id of the cluster head.
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  getPublishedCluster(clusterHeadId, options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("exhibitionCluster", this.exhibitionId, clusterHeadId)
      },
      options
    ).then((response) => {
      response.users = response["_embedded"]["be:user"];
      return response;
    });
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
        response["_embedded"]["be:instance"].forEach((instance) => {
          instance.users = response["_embedded"]["be:user"];
        });
        return response["_embedded"]["be:instance"];
      } else {
        return [];
      }
    });
  }

  /**
   * Retrieves exhibition instances.
   * @param  {String} instanceId      The id of the instance.
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  getPublishedInstance(instanceId, options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("exhibitionInstance", this.exhibitionId, instanceId)
      },
      options
    ).then((response) => {
      response.users = response["_embedded"]["be:user"];
      return response;
    });
  }
}



