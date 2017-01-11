"use strict";

import endpoint from "../endpoint";

/**
 * Abstract representation of tenant-features.
 */
export default class TenantFeatures {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant
   */
  constructor(tenant) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;
  }

  /**
   * Retrieves the list of tenant features.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.admin.execute({path: endpoint("adminTenantFeatures", this.tenant.id)}, options)
      .then((response) => {
        if (response && response["_embedded"]) {
          return response["_embedded"]["be-admin:tenant_feature"];
        } else {
          return [];
        }
      });
  }

  /**
   * Toggle the provided feature on/off
   *
   * @param {String} feature      the feature name
   * @param {boolean} toggleValue the feature toggle value; true its 'on'
   * @param {Object} options      the options object
   * @returns {Promise.<Object, Error>}
   */
  toggle(feature, toggleValue, options = {}) {
    return this.tenant.admin.execute({
      method: "PUT",
      path: endpoint("adminTenantFeatures", this.tenant.id),
      body: {
        feature: feature,
        value: toggleValue
      }
    }, options);
  }
}
