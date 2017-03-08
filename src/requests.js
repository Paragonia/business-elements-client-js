"use strict";

import endpoint from "./endpoint";
import InteractionContent from "./interaction-content";

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
export function requestInvitation(emailAddress) {
  if (!emailAddress) {
    throw new Error("An email address is required.");
  }

  return {
    method: "POST",
    path: endpoint("userInvitationRequest"),
    body: {emailAddress}
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

// Applications

export function createApplicationConceptForm(applicationHandle, conceptId, applicationFormHandle, form) {
  if (!applicationHandle) {
    throw new Error("An application handle is required.");
  }

  if (!applicationFormHandle) {
    throw new Error("An application form handle is required.");
  }

  return {
    method: "POST",
    path: endpoint("applicationConceptForm", applicationHandle, conceptId, applicationFormHandle),
    body: {form}
  };
}

export function updateApplicationConceptForm(applicationHandle, conceptId, applicationFormHandle, form) {
  if (!applicationHandle) {
    throw new Error("An application handle is required.");
  }

  if (!applicationFormHandle) {
    throw new Error("An application form handle is required.");
  }

  return {
    method: "PATCH",
    path: endpoint("applicationConceptForm", applicationHandle, conceptId, applicationFormHandle),
    body: {form}
  };
}

export function createApplicationForm(applicationHandle, applicationFormHandle, applicationFormDescription) {
  if (!applicationHandle) {
    throw new Error("An application handle is required.");
  }

  if (!applicationFormHandle) {
    throw new Error("An application form handle is required.");
  }

  return {
    method: "POST",
    path: endpoint("applicationForms", applicationHandle),
    body: {
      applicationFormHandle,
      applicationFormDescription
    }
  };
}

export function createApplicationAttributeForm(applicationHandle, attributeId, applicationFormHandle, form) {
  if (!applicationHandle) {
    throw new Error("An application handle is required.");
  }

  if (!applicationFormHandle) {
    throw new Error("An application form handle is required.");
  }

  return {
    method: "POST",
    path: endpoint("applicationConceptForm", applicationHandle, attributeId, applicationFormHandle),
    body: {form}
  };
}

export function updateApplicationAttributeForm(applicationHandle, attributeId, applicationFormHandle, form) {
  if (!applicationHandle) {
    throw new Error("An application handle is required.");
  }

  if (!applicationFormHandle) {
    throw new Error("An application form handle is required.");
  }

  return {
    method: "PATCH",
    path: endpoint("applicationConceptForm", applicationHandle, attributeId, applicationFormHandle),
    body: {form}
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

export function createTeam(orgId, name, description, isOwnerTeam, visibility) {
  if (!orgId) {
    throw new Error("An Organization Id where the team belongs is required.");
  }
  if (!name) {
    throw new Error("An team name is required.");
  }
  return {
    method: "POST",
    path: endpoint("teams", orgId),
    body: {name, description, isOwnerTeam, visibility}
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

export function specifyOwnerTeam(orgId, teamId, isOwnerTeam) {
  if (!orgId) {
    throw new Error("An Organization Id where the team belongs is required.");
  }
  if (!teamId) {
    throw new Error("An Team Id is required in order to perform updates on it.");
  }

  return {
    method: "PUT",
    path: endpoint("ownerTeam", orgId, teamId),
    body: {isOwnerTeam}
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

export function sendInteraction(projectId, contextId, content) {
  if (!content || !(InteractionContent.isOfSameType(content))) {
    throw new Error("InteractionContent is required.");
  }
  return {
    method: "POST",
    path: endpoint("projectContextInteractions", projectId, contextId),
    body: {
      content: content.jsonObject()
    }
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

export function specifyTranslation(valueId, projectId, attributeHandle, languageCode, data) {
  return {
    method: "PUT",
    path: endpoint("valueTranslation", valueId),
    body: {
      projectId,
      attributeHandle,
      languageCode,
      data
    }
  };
}

export function deleteTranslation(valueId, projectId, languageCode) {
  return {
    method: "DELETE",
    path: endpoint("valueTranslation", valueId),
    body: {
      projectId,
      languageCode
    }
  };
}

export function deleteValue(valueId, projectId) {
  return {
    method: "DELETE",
    path: endpoint("value", valueId),
    body: {
      projectId
    }
  };
}

export function getValueHistory(valueId, revision) {
  return {
    method: "GET",
    path: endpoint("valueHistoryRevision", valueId, revision)
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

// Marker Cells
export function createMarkerCell(projectContextId, position) {
  return {
    method: "POST",
    path: endpoint("markerCells"),
    body: {
      projectContextId,
      position
    }
  };
}

export function updateMarkerCell(markerCellId, name, color) {
  return {
    method: "PUT",
    path: endpoint("markerCell", markerCellId),
    body: {
      name,
      color
    }
  };
}

export function deleteMarkerCell(markerCellId) {
  return {
    method: "DELETE",
    path: endpoint("markerCell", markerCellId),
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

export function updateExhibition(exhibitionId, name, description, pictureUri) {
  return {
    method: "PUT",
    path: endpoint("exhibition", exhibitionId),
    body: {
      name,
      description,
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

//Concepts
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

export function updateConcept(conceptId, schema) {
  if (!conceptId) {
    throw new Error("A concept handle is required");
  }
  if (!schema) {
    throw new Error("A concept schema object is required.");
  }
  return {
    method: "PUT",
    path: endpoint("concept", conceptId),
    body: {
      schema
    }
  };
}

export function updateConceptCategory(conceptId, conceptCategory) {
  if (!conceptId) {
    throw new Error("A concept conceptId is required");
  }
  if (!conceptCategory) {
    throw new Error("A concept category is required.");
  }
  return {
    method: "PUT",
    path: endpoint("conceptCategory", conceptId),
    body: {
      conceptCategory
    }
  };
}

export function updateConceptForm(conceptId, form) {
  if (!conceptId) {
    throw new Error("A concept conceptId is required");
  }
  if (!form) {
    throw new Error("A concept form is required.");
  }
  return {
    method: "PUT",
    path: endpoint("conceptForm", conceptId),
    body: {
      form
    }
  };
}

export function createRelationSpecification(conceptId, specificationHandle, relationCategory, subjectCriteria, objectCriteria, direction) {
  if (!conceptId) {
    throw new Error("A concept conceptId is required");
  }

  return {
    method: "POST",
    path: endpoint("conceptRelationSpecification", conceptId),
    body: {
      specificationHandle,
      relationCategory,
      subjectCriteria,
      objectCriteria,
      direction
    }
  };
}

export function specifyRelationCategory(relationSpecificationId, relationCategory) {
  if (!relationSpecificationId) {
    throw new Error("A concept relationSpecificationId is required");
  }

  return {
    method: "PUT",
    path: endpoint("specifyRelationCategory", relationSpecificationId),
    body: {
      relationCategory
    }
  };
}

export function specifyRelationSubjectCriteria(relationSpecificationId, subjectCriteria) {
  if (!relationSpecificationId) {
    throw new Error("A concept relationSpecificationId is required");
  }

  return {
    method: "PUT",
    path: endpoint("specifyRelationSubject", relationSpecificationId),
    body: {
      subjectCriteria
    }
  };
}

export function specifyRelationObjectCriteria(relationSpecificationId, objectCategory) {
  if (!relationSpecificationId) {
    throw new Error("A concept relationSpecificationId is required");
  }

  return {
    method: "PUT",
    path: endpoint("specifyRelationObject", relationSpecificationId),
    body: {
      objectCategory
    }
  };
}

export function specifyRelationDirection(relationSpecificationId, direction) {
  if (!relationSpecificationId) {
    throw new Error("A concept relationSpecificationId is required");
  }

  return {
    method: "PUT",
    path: endpoint("specifyRelationDirection", relationSpecificationId),
    body: {
      direction
    }
  };
}

export function deleteRelationSpecification(relationSpecificationId) {
  if (!relationSpecificationId) {
    throw new Error("A concept relationSpecificationId is required");
  }

  return {
    method: "DELETE",
    path: endpoint("deleteRelation", relationSpecificationId)
  };
}

export function deleteConcept(conceptId) {
  return {
    method: "DELETE",
    path: endpoint("concept", conceptId),
    body: {}
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

export function listProjectInstances(projectId) {
  if (!projectId) {
    throw new Error("A projectId is required");
  }

  return {
    method: "GET",
    path: endpoint("instances", projectId)
  };
}

export function listValueInstances(projectId, valueId) {
  if (!projectId) {
    throw new Error("A projectId is required");
  }

  if (!valueId) {
    throw new Error("A valueId is required");
  }

  return {
    method: "GET",
    path: endpoint("projectValueInstances", projectId, valueId)
  };
}

export function listInstanceRelations(instanceId) {
  if (!instanceId) {
    throw new Error("A instanceId is required");
  }

  return {
    method: "GET",
    path: endpoint("instancesRelations", instanceId)
  };
}

export function deleteInstance(projectId, instanceId) {
  return {
    method: "DELETE",
    path: endpoint("projectInstance", projectId, instanceId)
  };
}

export function updateInstance(projectId, instanceId, operations, relations) {
  return {
    method: "PATCH",
    path: endpoint("projectInstance", projectId, instanceId),
    body: {
      operations,
      relations
    }
  };
}

export function addInstanceValues(projectId, instanceId, values) {
  return {
    method: "PATCH",
    path: endpoint("projectInstanceValues", projectId, instanceId),
    body: {
      values
    }
  };
}

export function specifyInstanceRelation(projectId, instanceId, specificationId, subjectId, subjectType, objectId, objectType) {
  return {
    method: "POST",
    path: endpoint("instanceRelation", projectId, instanceId, specificationId),
    body: {
      subjectId,
      subjectType,
      objectId,
      objectType
    }
  };
}

export function createInstanceCell(instanceId, projectIdOption, projectContextId, position) {
  return {
    method: "POST",
    path: endpoint("instanceCells", instanceId),
    body: {
      projectContextId,
      position,
      projectIdOption
    }
  };
}

export function updateInstanceCell(instanceId, instanceCellId, position) {
  return {
    method: "PUT",
    path: endpoint("instanceCell", instanceId, instanceCellId),
    body: {
      position
    }
  };
}

export function deleteInstanceCell(instanceId, instanceCellId, position) {
  return {
    method: "DELETE",
    path: endpoint("instanceCell", instanceId, instanceCellId)
  };
}

export function addInstanceTag(projectId, instanceId, tag) {
  return {
    method: "PUT",
    path: endpoint("projectInstanceTags", projectId, instanceId),
    body: {
      tag
    }
  };
}

export function removeInstanceTag(projectId, instanceId, tag) {
  return {
    method: "DELETE",
    path: endpoint("projectInstanceTags", projectId, instanceId),
    body: {
      tag
    }
  };
}

export function searchTags(projectId) {
  return {
    method: "POST",
    path: endpoint("searchTags"),
    body: {
      projectId
    }
  };
}

export function createQuery(conceptId, collectionName) {
  return {
    method: "POST",
    path: endpoint("queries"),
    body: {conceptId, collectionName}
  };
}

export function deleteQuery(queryId) {
  return {
    method: "DELETE",
    path: endpoint("query", queryId)
  };
}

export function addQueryFilter(queryId, queryDefinitionFilter) {
  return {
    method: "PUT",
    path: endpoint("query", queryId),
    body: {queryDefinitionFilter}
  };
}

export function addPersonRole(roleId) {
  return {
    method: "POST",
    path: endpoint("person"),
    body: {roleId}
  };
}

export function removePersonRole(roleId) {
  return {
    method: "DELETE",
    path: endpoint("person"),
    body: {roleId}
  };
}

export function deleteBout(boutId) {
  return {
    method: "DELETE",
    path: endpoint("boutDelete", boutId)
  };
}

// Attribute
export function createAttribute(handle, schema) {
  if (!handle) {
    throw new Error("An attribute handle is required");
  }
  if (!schema) {
    throw new Error("A attribute schema object is required.");
  }
  return {
    method: "POST",
    path: endpoint("attributes"),
    body: {handle, schema}
  };
}

export function updateAttribute(attributeId, schema) {
  if (!attributeId) {
    throw new Error("An attribute id is required");
  }
  if (!schema) {
    throw new Error("A attribute schema object is required.");
  }
  return {
    method: "PUT",
    path: endpoint("attribute", attributeId),
    body: {
      schema
    }
  };
}

export function deleteAttribute(attributeId) {
  if (!attributeId) {
    throw new Error("An attribute id is required");
  }
  return {
    method: "DELETE",
    path: endpoint("attribute", attributeId),
    body: {}
  };
}

// Admin
export function createTenant(handle, name, ownerEmailAddress) {
  if (!handle) {
    throw new Error("An tenant handle is required.");
  }
  if (!name) {
    throw new Error("An tenant name is required.");
  }
  if (!ownerEmailAddress) {
    throw new Error("An tenant ownerEmailAddress is required.");
  }
  return {
    method: "POST",
    path: endpoint("adminTenants"),
    body: {
      handle,
      name,
      ownerEmailAddress
    }
  };
}

export function updateTenant(tenantId, handle, addOwnerEmailAddresses, removeOwnerEmailAddresses) {

  const bodyRequest = {};

  if (handle !== null) {
    bodyRequest.handle = handle;
  }
  if (addOwnerEmailAddresses !== null && addOwnerEmailAddresses.length > 0) {
    bodyRequest.addOwnerEmailAddresses = addOwnerEmailAddresses;
  }
  if (removeOwnerEmailAddresses !== null && removeOwnerEmailAddresses.length > 0) {
    bodyRequest.removeOwnerEmailAddresses = removeOwnerEmailAddresses;
  }

  return {
    method: "PUT",
    path: endpoint("adminTenant", tenantId),
    body: bodyRequest
  };
}
