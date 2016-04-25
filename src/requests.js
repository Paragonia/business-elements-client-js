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
    path: endpoint("login"),
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
    method: "POST",
    path: endpoint("logout"),
    headers: {...headers}
  };
}

/**
 * Check availability of email address
 *
 * @private
 * */
export function isEmailAvailable(emailAddress) {
  if (!emailAddress) {
    throw new Error("An email address is required.");
  }

  return {
    method: "PUT",
    path: endpoint("isEmailAvailable"),
    body: {
      emailAddress: emailAddress
    }
  };

}
