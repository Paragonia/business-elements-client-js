"use strict";

import HTTP from "./http";
import Attributes from "./attributes";
import Values from "./values";
import Captures from "./captures";
import Organizations from "./organizations";
import Projects from "./projects";
import Instances from "./instances";
import Users from "./users";
import UploadOptions from "./upload-options";
import Invitation from "./invitation";
import Exhibitions from "./exhibitions";
import Resources from "./resources";
import Concepts from "./concepts";
import BeProxy from "./be-proxy";
import Applications from "./applications";
import Queries from "./queries";
import Bouts from "./bouts";
import endpoint from "./endpoint";
import * as requests from "./requests";

/**
 * Abstract representation of a selected tenant.
 */
export default class Tenant {
  /**
   * Constructor.
   *
   * @param  {BusinessElementsClientBase} client The client instance.
   * @param  {String}      domainName            The tenant domain name.
   */
  constructor(client, domainName) {
    /**
     * @ignore
     */
    this.client = client;

    /**
     * The tenant domain name.
     * @type {String}
     */
    this.domainName = domainName;

    /**
     * Options that need to be added for every tenant request
     * @private
     * @type {Object}
     */
    this._tenantOptions = {
      headers: {
        tenant: this.domainName
      }
    };
  }

  /**
   * Merges passed options with tenant options.
   *
   * @param  {Object} options The options to merge.
   * @return {Object}         The merged options.
   */
  createTenantOptions(options = {}) {
    return {
      ...this._tenantOptions,
      ...options,
      headers: {
        ...this._tenantOptions.headers,
        ...options.headers
      }
    };
  }

  /**
   * Executes an atomic HTTP request for a tenant.
   *
   * This will delegate to the client with all tenant options merged.
   *
   * @param  {Object}  request     The request object.
   * @param  {Object}  options     Optional options will be merged into the request, allowing the user to override any request option.
   * @param  {boolean} [raw]       Resolve with full response object, including json body and headers (Default: `false`, so only the json body is retrieved).
   * @return {Promise<Object, Error>}
   */
  execute(request, options, raw = false) {
    return this.client.execute(request, this.createTenantOptions(options), raw);
  }

  /**
   * Provides access to tenant attributes.
   *
   * @returns {Attributes}
   */
  attributes() {
    return new Attributes(this);
  }

  /**
   * Provides access to tenant values.
   *
   * @returns {Values}
   */
  values() {
    return new Values(this);
  }

  /**
   * Provides access to tenant organizations.
   *
   * @return {Organizations}
   */
  organizations() {
    return new Organizations(this);
  }

  /**
   * Provides access to tenant projects.
   *
   * @return {Projects}
   */
  projects() {
    return new Projects(this);
  }

  /**
   * Provides access to tenant instances.
   *
   * @return {Instances}
   */
  instances() {
    return new Instances(this);
  }

  /**
   * Provides access to tenant users.
   *
   * @return {Users}
   */
  users() {
    return new Users(this);
  }

  /**
   * Provides access to tenant captures.
   *
   * @return {Captures}
   */
  captures() {
    return new Captures(this);
  }

  /**
   * Provides access to tenant invitations
   *
   * @return {Invitation}
   */
  invitation() {
    return new Invitation(this);
  }

  /**
   * Provides access to tenant exhibitions.
   *
   * @return {Exhibitions}
   */
  exhibitions() {
    return new Exhibitions(this);
  }

  /**
   * Provides access to upload options because details are often required by other libraries.
   *
   * @return {UploadOptions}
   */
  uploadOptions() {
    return new UploadOptions({
      remote: this.client.remote + endpoint("upload"),
      headers: {
        ...this.createTenantOptions().headers,
        ...this.client.getRequestOptions().headers
      }
    });
  }

  /**
   * Provides access to user resources.
   *
   * @return {Resources}
   */
  resources() {
    return new Resources(this);
  }

  /**
   * Provides access to concepts.
   *
   * @return {Concepts}
   */
  concepts() {
    return new Concepts(this);
  }

  /**
   * Provides access to tenant queries.
   *
   * @return {Queries}
   */
  queries() {
    return new Queries(this);
  }

  /**
   * Provides access to tenant bouts.
   *
   * @return {Bouts}
   */
  bouts() {
    return new Bouts(this);
  }

  /**
   * Provides access to proxy
   */
  beProxy() {
    return new BeProxy(this);
  }

  applications() {
    return new Applications(this);
  }

  /**
   * Get the download uri for the specified resource.
   *
   * @param  {String}     resourceUri           The resource uri.
   * @param  {String}     [qualifier]           Optional qualifier.
   * @param  {Boolean}    [includeCredentials]  Optionally include credentials in the request.
   * @return {String} Download uri.
   */
  getDownloadUri(resourceUri, qualifier = null, includeCredentials = false) {
    return this._getDirectUri(endpoint("download", resourceUri), { qualifier }, includeCredentials);
  }

  /**
   * Get the public download uri for the specified resource.
   *
   * @param  {String}     resourceUri           The resource uri.
   * @param  {String}     [qualifier]           Optional qualifier.
   * @return {String} Public download uri.
   */
  getPublicDownloadUri(resourceUri, qualifier = null) {
    return this._getDirectUri(endpoint("downloadPublic", this.domainName, resourceUri), { qualifier }, false);
  }

  /**
   * Get the download uri for the specified resource.
   *
   * @param  {String}     projectId             The project id.
   * @return {String} Project export uri.
   */
  getProjectExportUri(projectId) {
    return this._getDirectUri(endpoint("projectExport", projectId), { }, true);
  }

  _getDirectUri(endpointString, params = {}, includeCredentials = false) {
    const baseUri = this.client.remote + endpointString;

    if (includeCredentials) {
      params["Tenant"] = this.domainName;
      params["Authentication-Token"] = this.client.authenticationToken;
    }

    return baseUri + HTTP.toQueryString(params);
  }

  /**
   * Retrieves the current tenant details.
   *
   * @param  {Object} options         The options object.
   * @return {Promise<Array<Object>, Error>}
   */
  get(options = {}) {
    return this.execute(requests.currentTenant(), options);
  }
}
