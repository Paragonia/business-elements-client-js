"use strict";

/**
 * Endpoints templates.
 * @type {Object}
 */
const ENDPOINTS = {
  root:                   () => "/",
  login:                  () => "/login",
  logout:                 () => "/logout",
  authentication:         () => "/authentication",
  login:                  () => "/login",
  isEmailAvailable:       () => "/availability/email"
};

/**
 * Retrieves a server endpoint by its name.
 *
 * @private
 * @param  {String}    name The endpoint name.
 * @param  {...string} args The endpoint parameters.
 * @return {String}
 */
export default function endpoint(name, ...args) {
  return ENDPOINTS[name](...args);
}
