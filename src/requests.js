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

export function activationRequest(emailAddress) {
  if (!emailAddress) {
    throw new Error("An email address is required.");
  }

  return {
    method: "POST",
    path: endpoint("userActivationRequest"),
    body: {emailAddress}
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

export function updateMyDisplayName(name) {
  return {
    method: "PUT",
    path: endpoint("myDisplayName"),
    body: {name}
  };
}

export function updateMyBiography(biography) {
  return {
    method: "PUT",
    path: endpoint("myBiography"),
    body: {biography}
  };
}

export function updateMyAvatarImage(pictureUri) {
  return {
    method: "PUT",
    path: endpoint("myAvatarImage"),
    body: {pictureUri}
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

// Organizations

export function createOrganization(name) {
  if (!name) {
    throw new Error("An organization name is required.");
  }
  return {
    method: "POST",
    path: endpoint("organizations"),
    body: {name}
  };
}

export function deleteOrganization(id) {
  if (!id) {
    throw new Error("An organization id is required.");
  }
  return {
    method: "DELETE",
    path: endpoint("organization", (id))
  };
}

export function updateOrganization(id, name) {
  if (!id) {
    throw new Error("An organization id is required.");
  }
  if (!name) {
    throw new Error("An organization name is required.");
  }
  return {
    method: "PUT",
    path: endpoint("organization", (id)),
    body: {name}
  };
}

export function changeOrganizationLogo(id, pictureUri) {
  if (!id) {
    throw new Error("An organization id is required.");
  }

  return {
    method: "PUT",
    path: endpoint("organizationLogo", id),
    body: {pictureUri}
  };
}

// Teams

export function createTeam(orgId, name, description, visibility) {
  if (!orgId) {
    throw new Error("An Organization Id where the team belongs is required.");
  }
  if (!name) {
    throw new Error("An team name is required.");
  }
  return {
    method: "POST",
    path: endpoint("teams", orgId),
    body: {name, description, visibility}
  };
}

export function updateTeam(orgId, teamId, name) {
  if (!orgId) {
    throw new Error("An Organization Id where the team belongs is required.");
  }
  if (!teamId) {
    throw new Error("An Team Id is required in order to perform updates on it.");
  }
  if (!name) {
    throw new Error("An team name is required.");
  }
  return {
    method: "PUT",
    path: endpoint("team", orgId, teamId),
    body: {name}
  };
}

export function deleteTeam(orgId, teamId) {
  if (!orgId) {
    throw new Error("An Organization Id where the team belongs is required.");
  }
  if (!teamId) {
    throw new Error("An Team Id is required in order to perform updates on it.");
  }
  return {
    method: "DELETE",
    path: endpoint("team", orgId, teamId)
  };
}

// Team Members

export function addTeamMember(orgId, teamId, emailAddress) {
  if (!orgId) {
    throw new Error("An Organization Id is required.");
  }
  if (!teamId) {
    throw new Error("An Team Id is required.");
  }
  if (!emailAddress) {
    throw new Error("An email address is required.");
  }
  return {
    method: "POST",
    path: endpoint("teamMembers", orgId, teamId),
    body: {emailAddress}
  };
}

export function deleteTeamMember(orgId, teamId, memberId) {
  if (!orgId) {
    throw new Error("An Organization Id is required.");
  }
  if (!teamId) {
    throw new Error("An Team Id is required.");
  }
  if (!memberId) {
    throw new Error("An Member Id is required.");
  }
  return {
    method: "DELETE",
    path: endpoint("teamMember", orgId, teamId, memberId)
  };
}

// Team Invitations

export function deleteTeamInvitation(orgId, teamId, invitationId) {
  if (!orgId) {
    throw new Error("An Organization Id is required.");
  }
  if (!teamId) {
    throw new Error("An Team Id is required.");
  }
  if (!invitationId) {
    throw new Error("An Member Id is required.");
  }
  return {
    method: "DELETE",
    path: endpoint("teamInvitation", orgId, teamId, invitationId)
  };
}

export function sentTeamInvitation(orgId, teamId, emailAddress) {
  if (!orgId) {
    throw new Error("An Organization Id is required.");
  }
  if (!teamId) {
    throw new Error("An Team Id is required.");
  }
  if (!emailAddress) {
    throw new Error("An email address is required.");
  }
  return {
    method: "POST",
    path: endpoint("teamInvitations", orgId, teamId, emailAddress),
    body: {emailAddress}
  };
}

export function acceptTeamMemberInvitation(invitationId, emailAddress, password) {
  if (!invitationId) {
    throw new Error("An Invitation Id is required ");
  }
  if (!emailAddress) {
    throw new Error("An emailAddress is required.");
  }
  if (!password) {
    throw new Error("An Password Id is required.");
  }
  return {
    method: "POST",
    path: endpoint("teamInvitationAccept", invitationId),
    body: {emailAddress, password}
  };
}

// Projects

export function createOrganizationProject(organizationId, name, description) {
  return {
    method: "POST",
    path: endpoint("organizationProjects", organizationId),
    body: {name, description}
  };
}

export function editOrganizationProject(organizationId, id, name, description) {
  return {
    method: "PUT",
    path: endpoint("organizationProject", organizationId, id),
    body: {name, description}
  };
}

export function deleteOrganizationProject(organizationId, id) {
  return {
    method: "DELETE",
    path: endpoint("organizationProject", organizationId, id)
  };
}

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
    path: endpoint("project", id)
  };
}

export function createProjectContext(projectId, name) {
  return {
    method: "POST",
    path: endpoint("projectContexts", projectId),
    body: {name}
  };
}

export function editProjectContext(projectId, id, name) {
  return {
    method: "PUT",
    path: endpoint("projectContext", projectId, id),
    body: {name}
  };
}

export function deleteProjectContext(projectId, id) {
  return {
    method: "DELETE",
    path: endpoint("projectContext", projectId, id)
  };
}

export function getContextClusters(projectId, contextId) {
  return {
    method: "GET",
    path: endpoint("projectContextClusters", projectId, contextId)
  };
}

export function updateContextPosition(projectId, contextId, position) {
  return {
    method: "POST",
    path: endpoint("projectContextPositions", projectId, contextId),
    body: {position}
  };
}

// Project teams
export function createOrganizationProjectTeam(organizationId, projectId, teamId, permission) {
  if (!organizationId) {
    throw new Error("An Organization Id is required.");
  }
  if (!projectId) {
    throw new Error("An Project Id is required.");
  }
  if (!teamId) {
    throw new Error("An Team Id is required.");
  }
  if (!permission) {
    throw new Error("An Team permission is required.");
  }
  return {
    method: "POST",
    path: endpoint("organizationProjectTeams", organizationId, projectId),
    body: {teamId, permission}
  };
}

export function deleteProjectTeam(organizationId, projectId, teamId) {
  if (!organizationId) {
    throw new Error("An Organization Id is required.");
  }
  if (!projectId) {
    throw new Error("An Project Id is required.");
  }
  if (!teamId) {
    throw new Error("An Team Id is required.");
  }
  return {
    method: "DELETE",
    path: endpoint("organizationProjectTeam", organizationId, projectId, teamId)
  };
}

export function editProjectTeam(organizationId, projectId, teamId, permission) {
  if (!organizationId) {
    throw new Error("An Organization Id is required.");
  }
  if (!projectId) {
    throw new Error("An Project Id is required.");
  }
  if (!permission) {
    throw new Error("An Team permission is required.");
  }
  return {
    method: "PUT",
    path: endpoint("organizationProjectTeam", organizationId, projectId, teamId),
    body: {permission}
  };
}

// Captures

export function createCapture(description, media) {
  return {
    method: "POST",
    path: endpoint("captures"),
    body: {
      description,
      media
    }
  };
}

export function editCapture(captureId, description) {
  return {
    method: "PUT",
    path: endpoint("capture", captureId),
    body: {
      description
    }
  };
}

export function deleteCapture(captureId) {
  return {
    method: "DELETE",
    path: endpoint("capture", captureId)
  };
}

//Capture-Media
export function addCaptureMedia(captureId, media) {
  return {
    method: "POST",
    path: endpoint("captureMedias", captureId),
    body: {
      media
    }
  };
}

export function deleteCaptureMedia(captureId, captureMediaId) {
  return {
    method: "DELETE",
    path: endpoint("captureMedia", captureId, captureMediaId)
  };
}

//Values
export function createValue(projectId, attributeHandle, data) {
  return {
    method: "POST",
    path: endpoint("values"),
    body: {
      projectId,
      attributeHandle,
      data
    }
  };
}

export function editValue(valueId, projectId, attributeHandle, data) {
  return {
    method: "PUT",
    path: endpoint("value", valueId),
    body: {
      projectId,
      attributeHandle,
      data
    }
  };
}

// Cells
export function createValueCell(valueId, projectIdOption, projectContextId, position) {
  return {
    method: "POST",
    path: endpoint("cells", valueId),
    body: {
      projectContextId,
      position,
      projectIdOption
    }
  };
}

export function editValueCell(valueId, cellId, position) {
  return {
    method: "PUT",
    path: endpoint("cell", valueId, cellId),
    body: {
      position
    }
  };
}

export function deleteValueCell(valueId, cellId) {
  return {
    method: "DELETE",
    path: endpoint("cell", valueId, cellId),
    body: {}
  };
}

// Exhibition
export function createExhibition(projectId, name, description, pictureUri) {
  return {
    method: "POST",
    path: endpoint("exhibitions"),
    body: {
      projectId,
      name,
      description,
      pictureUri
    }
  };
}

export function changeExhibitionVisibility(exhibitionId, visibility) {
  return {
    method: "PUT",
    path: endpoint("exhibitionVisibility", exhibitionId),
    body: {
      visibility
    }
  };
}

export function changeExhibitionDescription(exhibitionId, description) {
  return {
    method: "PUT",
    path: endpoint("exhibitionDescription", exhibitionId),
    body: {
      description
    }
  };
}

export function changeExhibitionPicture(exhibitionId, pictureUri) {
  return {
    method: "PUT",
    path: endpoint("exhibitionPicture", exhibitionId),
    body: {
      pictureUri
    }
  };
}

export function deleteExhibition(exhibitionId) {
  return {
    method: "DELETE",
    path: endpoint("exhibition", exhibitionId),
    body: {}
  };
}

export function createConcept(handle, schema) {
  if (!handle) {
    throw new Error("A concept handle is required");
  }
  if (!schema) {
    throw new Error("A concept schema object is required.");
  }
  return {
    method: "POST",
    path: endpoint("concepts"),
    body: {
      handle,
      schema
    }
  };
}

//Instances
export function createInstance(projectId, concept, properties, relations) {
  if (!concept) {
    throw new Error("A concept handle is required");
  }
  return {
    method: "POST",
    path: endpoint("instances", projectId),
    body: {
      concept,
      properties,
      relations
    }
  };
}

export function searchInstances(projectId, conceptId) {
  if (!projectId) {
    throw new Error("A projectId is required");
  }
  if (!conceptId) {
    throw new Error("A conceptId is required");
  }
  return {
    method: "POST",
    path: endpoint("searchInstances"),
    body: {
      projectId,
      conceptId
    }
  };
}

export function deleteInstance(projectId, instanceId) {
  return {
    method: "DELETE",
    path: endpoint("instance", projectId, instanceId)
  };
}

export function updateInstance(projectId, instanceId, operations, relations) {
  return {
    method: "PATCH",
    path: endpoint("instance", projectId, instanceId),
    body: {
      operations,
      relations
    }
  };
}

