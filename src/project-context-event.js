/**
 * Defines project context events.
 */
export default class ProjectContextEvent {

  /**
   * Creates a new project context event.
   *
   * @param {String} name to use for the event.
   * @param {String} value emitted in the event.
   */
  constructor(name, value) {

    /**
     * @type {String} Stores the name.
     * @private
     */
    this._name = name;


    /**
     * @type {String} Stores the value.
     * @private
     */
    this._value = value;
  }

  /**
   * @returns {String} name of the event.
   */
  get name() {
    return this._name;
  }

  /**
   * @returns {String} value of the event.
   */
  get value() {
    return this._value;
  }

  /**
   * @returns {string} representation of this enum.
   */
  toString() {
    return `ProjectContextEvent.${this.name}`;
  }
}

// Data events - attributes

ProjectContextEvent.ATTRIBUTE = new ProjectContextEvent("ATTRIBUTE", "attribute");
ProjectContextEvent.ATTRIBUTE_ADD = new ProjectContextEvent("ATTRIBUTE_ADD", "attributeAdd");
ProjectContextEvent.ATTRIBUTE_UPDATE = new ProjectContextEvent("ATTRIBUTE_UPDATE", "attributeUpdate");
ProjectContextEvent.ATTRIBUTE_DELETE = new ProjectContextEvent("ATTRIBUTE_DELETE", "attributeDelete");

// Data events - attribute references

ProjectContextEvent.ATTRIBUTE_REFERENCE = new ProjectContextEvent("ATTRIBUTE_REFERENCE", "reference");
ProjectContextEvent.ATTRIBUTE_REFERENCE_ADD = new ProjectContextEvent("ATTRIBUTE_REFERENCE_ADD", "referenceAdd");
ProjectContextEvent.ATTRIBUTE_REFERENCE_UPDATE = new ProjectContextEvent("ATTRIBUTE_REFERENCE_UPDATE", "referenceUpdate");
ProjectContextEvent.ATTRIBUTE_REFERENCE_DELETE = new ProjectContextEvent("ATTRIBUTE_REFERENCE_DELETE", "referenceDelete");

// User events - Connection

ProjectContextEvent.USER_CONNECT = new ProjectContextEvent("USER_CONNECT", "connect");
ProjectContextEvent.USER_RECONNECT = new ProjectContextEvent("USER_RECONNECT", "reconnect");
ProjectContextEvent.USER_DISCONNECT = new ProjectContextEvent("USER_DISCONNECT", "disconnect");

// User events - Interaction

ProjectContextEvent.USER_POSITION_UPDATE = new ProjectContextEvent("USER_POSITION_UPDATE", "positionUpdate");

// Do not allow changes
Object.freeze(ProjectContextEvent);
