"use strict";

import endpoint from "./endpoint";

/**
 * @private
 */
export function login(emailAddress, password) {
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
export function logout() {

  return {
    method: "DELETE",
    path: endpoint("currentAuthentication")
  };
}

export function listAuthentications() {
  return {
    method: "GET",
    path: endpoint("authentications")
  };
}

export function deleteAuthentication(authenticationId) {
  if (!authenticationId) {
    throw new Error("An authentication Id is required.");
  }

  return {
    method: "DELETE",
    path: endpoint("authentication", authenticationId)
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
    method: "POST",
    path: endpoint("userEmailAddressRequest"),
    body: {emailAddress}
  };
}

/**
 * @private
 */
export function createUser(emailAddress, password) {
  if (!emailAddress) {
    throw new Error("An email address is required.");
  }

  return {
    method: "POST",
    path: endpoint("users"),
    body: {emailAddress, password}
  };
}

/**
 * @private
 */
export function activateUser(userId, activationCode) {
  if (!userId) {
    throw new Error("A user id is required.");
  }

  if (!activationCode) {
    throw new Error("An activation code is required.");
  }

  return {
    method: "POST",
    path: endpoint("userActivation"),
    body: {userId, activationCode}
  };
}

/**
 * @private
 */
export function me() {
  return {
    method: "GET",
    path: endpoint("me")
  };
}

export function currentTenant() {
  return {
    method: "GET",
    path: endpoint("currentTenant")
  };
}

export function passwordResetRequest(emailAddress) {
  if (!emailAddress) {
    throw new Error("A user email is required.");
  }

  return {
    method: "POST",
    path: endpoint("userPasswordResetRequest"),
    body: {emailAddress}
  };
}

export function passwordReset(userId, passwordResetCode, password) {
  if (!userId) {
    throw new Error("A user id is required.");
  }
  if (!passwordResetCode) {
    throw new Error("A password reset code is required.");
  }
  if (!password) {
    throw new Error("A password is required.");
  }

  return {
    method: "POST",
    path: endpoint("userPasswordReset"),
    body: {userId, passwordResetCode, password}
  };
}

export function passwordChange(password) {
  if (!password) {
    throw new Error("A new password is required.");
  }

  return {
    method: "PATCH",
    path: endpoint("me"),
    body: {password}
  };
}

export function checkRegistrationStatus(emailAddress) {
  if (!emailAddress) {
    throw new Error("A user email is required.");
  }

  return {
    method: "POST",
    path: endpoint("checkRegistrationStatus"),
    body: {emailAddress}
  };
}

/**
 * @private
 */
export function createOrganization(name) {
  return {
    method: "POST",
    path: endpoint("organizations"),
    body: {name}
  };
}

// Projects

export function createProject(name, description) {
  return {
    method: "POST",
    path: endpoint("projects"),
    body: {name, description}
  };
}

export function editProject(id, name, description) {
  return {
    method: "PUT",
    path: endpoint("project", id),
    body: {name, description}
  };
}

export function deleteProject(id) {
  return {
    method: "DELETE",
    path: endpoint("project", (id))
  };
}
