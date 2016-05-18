"use strict";

import endpoint from "./endpoint";

/**
 * @private
 */
export function login(emailAddress, password, options = {}) {
  if (!emailAddress) {
    throw new Error("An email address is required.");
  }

  if (!password) {
    throw new Error("A password is required.");
  }

  return {
    method: "POST",
    path: endpoint("authentications"),
    body: {emailAddress, password: password}
  };
}

/**
 * @private
 */
export function logout(options = {}) {

  const {headers} = {...options};

  return {
    method: "DELETE",
    path: endpoint("currentAuthentication"),
    headers: {...headers}
  };
}

/**
 * Check availability of email address
 *
 * @private
 * */
export function isEmailAvailable(emailAddress, options = {}) {
  if (!emailAddress) {
    throw new Error("An email address is required.");
  }

  const {headers} = {...options};

  return {
    method: "POST",
    path: endpoint("userEmailAddressRequest"),
    headers: {...headers},
    body: {emailAddress}
  };
}

/**
 * @private
 */
export function createUser(emailAddress, password, options = {}) {
  if (!emailAddress) {
    throw new Error("An email address is required.");
  }

  const {headers} = {...options};

  return {
    method: "POST",
    path: endpoint("users"),
    headers: {...headers},
    body: {emailAddress, password}
  };
}

/**
 * @private
 */
export function activateUser(userId, activationCode, options = {}) {
  if (!userId) {
    throw new Error("A user id is required.");
  }

  if (!activationCode) {
    throw new Error("An activation code is required.");
  }

  const {headers} = {...options};

  return {
    method: "POST",
    path: endpoint("userActivation"),
    headers: {...headers},
    body: {userId, activationCode}
  };
}

/**
 * @private
 */
export function me(options = {}) {
  const {headers} = {...options};

  return {
    method: "GET",
    headers: {...headers},
    path: endpoint("me")
  };
}

export function currentTenant(options = {}) {
  const {headers} = {...options};
  
  return {
    method: "GET",
    headers: {...headers},
    path: endpoint("currentTenant")
  };
}

