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
    method: "PUT",
    path: endpoint("authentication"),
    body: {
      emailAddress: emailAddress,
      password: password
    }
  };
}

/**
 * @private
 */
export function logout(options = {}) {

  const { headers } = {...options};

  return {
    method: "DELETE",
    path: endpoint("authentication"),
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

  const { headers } = {...options};

  return {
    method: "PUT",
    path: endpoint("isEmailAvailable"),
    headers: {...headers},
    body: {
      emailAddress: emailAddress
    }
  };
}

/**
 * @private
 */
export function createUser(emailAddress, password, options = {}) {
  if (!emailAddress) {
    throw new Error("An email address is required.");
  }

  const { headers } = {...options};

  return {
    method: "POST",
    path: endpoint("users"),
    headers: {...headers},
    body: {
      emailAddress: emailAddress,
      password: password
    }
  };
}

