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

// Data events - values

ProjectContextEvent.VALUE = new ProjectContextEvent("VALUE", "value");
ProjectContextEvent.VALUE_CREATED = new ProjectContextEvent("VALUE_CREATED", "valueCreated");
ProjectContextEvent.VALUE_UPDATED = new ProjectContextEvent("VALUE_UPDATED", "valueUpdate");
ProjectContextEvent.VALUE_DELETED = new ProjectContextEvent("VALUE_DELETED", "valueDelete");

// Data events - value cells

ProjectContextEvent.VALUE_CELL = new ProjectContextEvent("VALUE_CELL", "valueCell");
ProjectContextEvent.VALUE_CELL_CREATED = new ProjectContextEvent("VALUE_CELL_CREATED", "valueCellCreated");
ProjectContextEvent.VALUE_CELL_UPDATED = new ProjectContextEvent("VALUE_CELL_UPDATED", "valueCellUpdated");
ProjectContextEvent.VALUE_CELL_DELETED = new ProjectContextEvent("VALUE_CELL_DELETED", "valueCellDeleted");

// User events - Connection

ProjectContextEvent.USER_CONNECT = new ProjectContextEvent("USER_CONNECT", "connect");
ProjectContextEvent.USER_RECONNECT = new ProjectContextEvent("USER_RECONNECT", "reconnect");
ProjectContextEvent.USER_DISCONNECT = new ProjectContextEvent("USER_DISCONNECT", "disconnect");

// User events - Interaction

ProjectContextEvent.USER_POSITION_UPDATE = new ProjectContextEvent("USER_POSITION_UPDATE", "positionUpdate");

// Do not allow changes
Object.freeze(ProjectContextEvent);
