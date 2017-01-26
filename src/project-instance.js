"use strict";

import endpoint from "./endpoint";
import * as requests from "./requests";

/**
 * Abstract representation of a instance.
 */
export default class Instance {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant     The tenant instance.
   * @param  {String} instanceId  The instance id.
   */
  constructor(tenant, projectId, instanceId) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The project id.
     * @type {String}
     */
    this.projectId = projectId;

    /**
     * The instance id.
     * @type {String}
     */
    this.instanceId = instanceId;
  }

  /**
   * Retrieves project instance.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Object, Error>}
   */
  getProjectInstance(options = {}) {
    return this.tenant.execute(
      {
        path: endpoint("projectInstance", this.projectId, this.instanceId)
      },
      options
    );
  }


  /**
   * Delete instance
   *
   * @param  {Object} options         The options object.
   * @returns {Promise.<Object, Error>}
   */
  remove(options = {}) {
    return this.tenant.execute(
      requests.deleteInstance(this.projectId, this.instanceId),
      options
    );
  }

  /**
   * Update the instance
   *
   * @param  {Object} updateOperations   the update-operations to perform on the instance
   * @param  {Array}  instanceCategories an array of concept-handles on which instance has relations with
   * @param  {Object} options            The options object.
   * @returns {Promise.<Object, Error>}
   */
  update(updateOperations, instanceCategories, options = {}) {
    return this.tenant.execute(
      requests.updateInstance(this.projectId, this.instanceId, updateOperations, instanceCategories),
      options
    );
  }

  /**
   * Update instance by adding existing values to the instance's properties list
   * 
   * @param   {Array}   values      The existing values to add
   * @param   {Object}  options     The options object
   * @returns {Promise.<Object, Error>}
     */
  addInstanceValues(values, options = {}) {
    return this.tenant.execute(
      requests.addInstanceValues(this.projectId, this.instanceId, values),
      options
    );
  }

  /**
   * Specifies a relation for an instance
   *
   * @param {Object} specificationId  The id of the relation specification
   * @param {String} subjectId  Id of the entity which is the subject of the relation
   * @param {String} subjectType Type of the entity which is subject of the relation
   * @param {String} objectId Id of the entity which is the object of the relation
   * @param {String} objectType Type of the entity which is object of the relation
   * @param  {Object} options            The options object.
   * @returns {Promise.<Object, Error>}
   */
  specifyInstanceRelation(specificationId, subjectId, subjectType, objectId, objectType, options = {}) {
    return this.tenant.execute(
      requests.specifyInstanceRelation(this.projectId, this.instanceId, specificationId, subjectId, subjectType, objectId, objectType),
      options
    );
  }


}
