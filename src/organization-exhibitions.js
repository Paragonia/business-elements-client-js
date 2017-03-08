"use strict";

import endpoint from "./endpoint";
import OrganizationExhibition from "./organization-exhibition";

/**
 * Abstract representation of organization exhibitions.
 */
export default class OrganizationExhibitions {

  /**
   * Constructor.
   *
   * @param  {Tenant} tenant The tenant instance.
   * @param  {Organization} organization   The organization instance.
   */
  constructor(tenant, organization) {

    /**
     * The tenant.
     * @type {Tenant}
     */
    this.tenant = tenant;

    /**
     * The organization id.
     * @type {Organization}
     */
    this.organization = organization;
  }

  /**
   * Retrieves the list of exhibitions in the current tenant.
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  list(options = {}) {
    return this.tenant.execute({path: endpoint("organizationExhibitions", this.organization.organizationId)}, options)
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
   * @return {OrganizationExhibition}
   */
  exhibition(id) {
    return new OrganizationExhibition(this.tenant, this.organization, id);
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
      {
        method: "POST",
        path: endpoint("organizationExhibitions", this.organization.organizationId),
        body: {
          name,
          description,
          projectId,
          pictureUri
        }
      },
      options
    );
  }

}

