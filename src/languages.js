"use strict";

import endpoint from "./endpoint";

/**
 * Abstract representation of languages.
 */
export default class Languages {

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
   * Retrieves the list of languages in the current tenant.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  listLanguages(options = {}) {
    return this.tenant.execute({path: endpoint("languages")}, options)
      .then((response) => {
        const embedded = response["_embedded"];
        if (embedded) {
          const languages = embedded["be:language"];
          if (languages) {
            return languages;
          }
        }
        return [];
      });
  }
}
