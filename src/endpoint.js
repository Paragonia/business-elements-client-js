"use strict";

/**
 * Endpoints templates.
 * @type {Object}
 */
const ENDPOINTS = {
  root:                                       () => "/",

  // Authentication

  authentications:                            () => "/authentications",
  authentication:                           (id) => `/authentications/${id}`,
  currentAuthentication:                      () => "/authentications/current",

  // Tenant

  currentTenant:                              () => "/tenants/current",

  // Users

  users:                                      () => "/users",
  user:                                     (id) => `/users/${id}`,
  userPasswordResetRequest:                   () => "/users/password_reset_request",
  userPasswordReset:                          () => "/users/password_reset",
  userEmailAddressRequest:                    () => "/users/email_address_request",
  userActivation:                             () => "/users/activation",
  userActivationRequest:                      () => "/users/activation_request",
  me:                                         () => "/users/me",
  myDisplayName:                              () => "/users/me/name",
  myBiography:                                () => "/users/me/biography",
  myAvatarImage:                              () => "/users/me/pictureUri",
  checkRegistrationStatus:                    () => "/users/registration_check",
  userInvitationRequest:                      () => "/users/invitation_request",
  person:                                     () => "/person",
  roles:                                      () => "/person/roles",

  // Upload

  upload:                                     () => "/upload",
  download:                        (resourceUri) => `/download/${resourceUri}`,

  // Public

  downloadPublic:    (tenantHandle, resourceUri) => `/assets/resource/${tenantHandle}/${resourceUri}`,
  proxyEmbeddable:                         (url) => `/assets/proxy/embeddable/${url}`,
  proxyYoutube:                             (id) => `/assets/proxy/youtube/preview/${id}`,

  // Concepts
  concepts:                                         () => "/concepts",
  concept:                                 (conceptId) => `/concepts/${conceptId}`,
  conceptCategory:                         (conceptId) => `/concepts/${conceptId}/category`,
  conceptForm:                             (conceptId) => `/concepts/${conceptId}/form`,
  conceptRelationSpecification:            (conceptId) => `/concepts/${conceptId}/specifications`,
  specifyRelationCategory:   (relationSpecificationId) => `/concepts/specifications/${relationSpecificationId}/category`,
  specifyRelationSubject:    (relationSpecificationId) => `/concepts/specifications/${relationSpecificationId}/subject`,
  specifyRelationObject:     (relationSpecificationId) => `/concepts/specifications/${relationSpecificationId}/object`,
  specifyRelationDirection:  (relationSpecificationId) => `/concepts/specifications/${relationSpecificationId}/direction`,
  deleteRelation:            (relationSpecificationId) => `/concepts/specifications/${relationSpecificationId}`,

  // Instances
  instances:                                      (projectId) => `/projects/${projectId}/instances`,
  projectInstance:                    (projectId, instanceId) => `/projects/${projectId}/instances/${instanceId}`,
  projectInstanceValues:              (projectId, instanceId) => `/projects/${projectId}/instances/${instanceId}/values`,
  projectValueInstance:                  (projectId, valueId) => `/projects/${projectId}/value/${valueId}/instances`,
  instanceRelation:  (projectId, instanceId, specificationId) => `/projects/${projectId}/instances/${instanceId}/relation/${specificationId}`,
  searchInstances:                                         () => "/search/instances",
  instance:                                      (instanceId) => `/instances/${instanceId}`,
  instancesRelations:                            (instanceId) => `/instances/${instanceId}/relations`,
  instanceCells:                                 (instanceId) => `/instances/${instanceId}/cells`,
  instanceCell:                  (instanceId, instanceCellId) => `/instances/${instanceId}/cells/${instanceCellId}`,

  // Resources
  resources:                                  () => "/resources",
  resource:                     (userResourceId) => `/resources/${userResourceId}`,

  // Captures

  captures:                                   () => "/captures",
  capture:                                  (id) => `/captures/${id}`,
  captureMedias:                            (id) => `/captures/${id}/media`,
  captureMedia:                    (id, mediaId) => `/captures/${id}/media/${mediaId}`,

  // Attributes
  attributes:                                 () => "/attributes",
  attribute:                       (attributeId) => `/attributes/${attributeId}`,

  // Values
  values:                                     () => "/values",
  value:                               (valueId) => `/values/${valueId}`,
  valueTranslation:                    (valueId) => `/values/${valueId}/translation`,
  valuesProject:                     (projectId) => `/values/project/${projectId}`,
  valuesHistory:                       (valueId) => `/values/${valueId}/history`,
  valueHistoryRevision:      (valueId, revision) => `/values/${valueId}/history/${revision}`,

  // Cells
  cells:                               (valueId) => `/values/${valueId}/cells`,
  cell:                        (valueId, cellId) => `/values/${valueId}/cells/${cellId}`,

  // Marker Cells
  markerCells:                                () => "/markers",
  markerCell:                     (markerCellId) => `/markers/${markerCellId}`,

  //Languages
  languages:                                  () => "/languages/iso",

  // Projects

  projects:                                    () => "/projects",
  project:                                   (id) => `/projects/${id}`,
  projectContexts:                    (projectId) => `/projects/${projectId}/contexts`,
  projectContext:          (projectId, contextId) => `/projects/${projectId}/contexts/${contextId}`,
  projectContextEvents:    (projectId, contextId) => `/projects/${projectId}/contexts/${contextId}/events`,
  projectContextClusters:  (projectId, contextId) => `/projects/${projectId}/contexts/${contextId}/clusters`,
  projectContextPositions: (projectId, contextId) => `/projects/${projectId}/contexts/${contextId}/positions`,
  projectExport:                      (projectId) => `/exports/projects/${projectId}`,

  // Organizations

  organizations:                                      () => "/organizations",
  organization:                                  (orgId) => `/organizations/${orgId}`,
  organizationLogo:                              (orgId) => `/organizations/${orgId}/logo`,
  organizationProjects:                          (orgId) => `/organizations/${orgId}/projects`,
  organizationProject:                (orgId, projectId) => `/organizations/${orgId}/projects/${projectId}`,
  organizationProjectTeams:           (orgId, projectId) => `/organizations/${orgId}/projects/${projectId}/teams`,
  organizationProjectTeam:    (orgId, projectId, teamId) => `/organizations/${orgId}/projects/${projectId}/teams/${teamId}`,

  // Teams

  teams:                                 (orgId) => `/organizations/${orgId}/teams`,
  team:                          (orgId, teamId) => `/organizations/${orgId}/teams/${teamId}`,
  ownerTeam:                     (orgId, teamId) => `/organizations/${orgId}/teams/${teamId}/owner`,

  // Team invitations

  teamInvitations:               (orgId, teamId) => `/organizations/${orgId}/teams/${teamId}/invitations`,
  teamInvitation:  (orgId, teamId, invitationId) => `/organizations/${orgId}/teams/${teamId}/invitations/${invitationId}`,
  teamInvitationAccept:           (invitationId) => `/team_invitations/${invitationId}`,

  // Team members

  teamMembers:                   (orgId, teamId) => `/organizations/${orgId}/teams/${teamId}/members`,
  teamMember:          (orgId, teamId, memberId) => `/organizations/${orgId}/teams/${teamId}/members/${memberId}`,

  // Exhibitions
  exhibitions:                                  () => "/exhibitions",
  publicExhibitions:                            () => "/exhibitions/public",
  exhibition:                       (exhibitionId) => `/exhibitions/${exhibitionId}`,
  exhibitionVisibility:             (exhibitionId) => `/exhibitions/${exhibitionId}/visibility`,
  exhibitionDescription:            (exhibitionId) => `/exhibitions/${exhibitionId}/description`,
  exhibitionPicture:                (exhibitionId) => `/exhibitions/${exhibitionId}/pictureUri`,
  exhibitionInstances:              (exhibitionId) => `/exhibitions/${exhibitionId}/published/instances`,
  exhibitionInstance:   (exhibitionId, instanceId) => `/exhibitions/${exhibitionId}/published/instances/${instanceId}`,
  exhibitionClusters:               (exhibitionId) => `/exhibitions/${exhibitionId}/published/clusters`,
  exhibitionCluster: (exhibitionId, clusterHeadId) => `/exhibitions/${exhibitionId}/published/clusters/${clusterHeadId}`,

  // Applications
  applications:                                                   () => "/applications",
  application:                                   (applicationHandle) => `/applications/${applicationHandle}`,
  applicationConfig:               (applicationHandle, configHandle) => `/applications/${applicationHandle}/configs/${configHandle}`,
  applicationLocalization:   (applicationHandle, localizationHandle) => `/applications/${applicationHandle}/localizations/${localizationHandle}`,

  // Queries
  queries:                        () => "/queries",
  query:                        (id) => `/queries/${id}`,

  //Bouts
  boutsEvents:                    () => "/bouts/events",
  boutDelete:                     (boutId) => `/bouts/${boutId}`,

  //Admin
  adminTenants:                                      () => "/admin/tenants",
  adminTenantUsers:                          (tenantId) => `/admin/tenants/${tenantId}/users`,
  adminTenant:                               (tenantId) => `/admin/tenants/${tenantId}`,
  adminTenantOwners:                         (tenantId) => `/admin/tenants/${tenantId}/owners`,
  adminTenantOwner:       (tenantId, ownerEmailAddress) => `/admin/tenants/${tenantId}/owners/${ownerEmailAddress}`,
  adminTenantHandle :                        (tenantId) => `/admin/tenants/${tenantId}/handle`,
  adminTenantEnabled:                        (tenantId) => `/admin/tenants/${tenantId}/enabled`,
  adminTenantFeatures:                       (tenantId) => `/admin/tenants/${tenantId}/features`,
  adminTenantFeature:                        (tenantId) => `/admin/tenants/${tenantId}/feature`,
  adminAccounts:                                     () => "/admin/accounts",
  adminAccountUsers:                        (accountId) => `/admin/accounts/${accountId}/users`,
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
