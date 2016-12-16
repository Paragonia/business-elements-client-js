"use strict";

import Users from "./users";
import endpoint from "../endpoint";
import * as requests from "../requests";

/**
 * Abstract representation of an admin tenant.
 */
export default class Tenant {

  /**
   * Constructor.
   *
   * @param  {Admin} admin The admin instance.
   * @param  {String} tenantId The id of the Tenant.
   */
  constructor(admin, tenantId) {

    /**
     * The admin.
     * @type {Tenant}
     */
    this.admin = admin;

    /**
     * The tenantId.
     * @type {String}
     */
    this.id = tenantId;
  }

  users() {
    return new Users(this);
  }

  edit(handle, addOwnerEmailAddresses, removeOwnerEmailAddresses, options = {}) {
    return this.admin.execute(
      requests.updateTenant(this.id, handle, addOwnerEmailAddresses, removeOwnerEmailAddresses),
      options
    );
  }

  setHandle(handle, options = {}) {
    return this.admin.execute({
      method: "PUT",
      path: endpoint("adminTenantHandle", this.id),
      body: {
        handle: handle
      }
    }, options);
  }

  addOwner(ownerEmailAddress, options = {}) {
    return this.admin.execute({
      method: "POST",
      path: endpoint("adminTenantOwners", this.id),
      body: {
        ownerEmailAddress: ownerEmailAddress
      }
    }, options);
  }

  removeOwner(ownerEmailAddress, options = {}) {
    return this.admin.execute({
      method: "DELETE",
      path: endpoint("adminTenantOwner", this.id, ownerEmailAddress)
    }, options);
  }

  toggleEnabled(enabledFlag, options = {}) {
    return this.admin.execute({
      method: "PUT",
      path: endpoint("adminTenantEnabled", this.id),
      body: {
        enabled: enabledFlag
      }
    }, options);
  }
}
