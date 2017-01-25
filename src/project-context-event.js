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

// Connect/recovered events
ProjectContextEvent.CONNECTED = new ProjectContextEvent("CONNECTED", "connected");
ProjectContextEvent.RECOVERED = new ProjectContextEvent("RECOVERED", "recovered");

// Data events - values

ProjectContextEvent.VALUE = new ProjectContextEvent("VALUE", "value");
ProjectContextEvent.VALUE_CREATED = new ProjectContextEvent("VALUE_CREATED", "valueCreated");
ProjectContextEvent.VALUE_UPDATED = new ProjectContextEvent("VALUE_UPDATED", "valueUpdated");
ProjectContextEvent.VALUE_DELETED = new ProjectContextEvent("VALUE_DELETED", "valueDeleted");

// Data events - value cells

ProjectContextEvent.VALUE_CELL = new ProjectContextEvent("VALUE_CELL", "valueCell");
ProjectContextEvent.VALUE_CELL_CREATED = new ProjectContextEvent("VALUE_CELL_CREATED", "valueCellCreated");
ProjectContextEvent.VALUE_CELL_MOVED = new ProjectContextEvent("VALUE_CELL_MOVED", "valueCellMoved");
ProjectContextEvent.VALUE_CELL_DELETED = new ProjectContextEvent("VALUE_CELL_DELETED", "valueCellDeleted");

// Data events - instance cells
ProjectContextEvent.INSTANCE = new ProjectContextEvent("INSTANCE", "instance");
ProjectContextEvent.INSTANCE_VALUE_ADDED = new ProjectContextEvent("INSTANCE_VALUE_ADDED", "instanceValueAdded");
ProjectContextEvent.INSTANCE_CREATED = new ProjectContextEvent("INSTANCE_CREATED", "instanceCreated");
ProjectContextEvent.INSTANCE_DELETED = new ProjectContextEvent("INSTANCE_DELETED", "instanceDeleted");
ProjectContextEvent.INSTANCE_CELL = new ProjectContextEvent("INSTANCE_CELL", "instanceCell");
ProjectContextEvent.INSTANCE_CELL_CREATED = new ProjectContextEvent("INSTANCE_CELL_CREATED", "instanceCellCreated");
ProjectContextEvent.INSTANCE_CELL_MOVED = new ProjectContextEvent("INSTANCE_CELL_MOVED", "instanceCellMoved");
ProjectContextEvent.INSTANCE_CELL_DELETED = new ProjectContextEvent("INSTANCE_CELL_DELETED", "instanceCellDeleted");

// Data events - value history
ProjectContextEvent.VALUE_HISTORY_ADDED = new ProjectContextEvent("VALUE_HISTORY_ADDED", "valueHistoryAdded");

// Data events - marker cells
ProjectContextEvent.MARKER_CELL = new ProjectContextEvent("MARKER_CELL", "markerCell");
ProjectContextEvent.MARKER_CELL_CREATED = new ProjectContextEvent("MARKER_CELL_CREATED", "markerCellCreated");
ProjectContextEvent.MARKER_CELL_UPDATED = new ProjectContextEvent("MARKER_CELL_UPDATED", "markerCellUpdated");
ProjectContextEvent.MARKER_CELL_DELETED = new ProjectContextEvent("MARKER_CELL_DELETED", "markerCellDeleted");

// User events - Connection
ProjectContextEvent.ONLINE_USERS = new ProjectContextEvent("ONLINE_USERS", "onlineUsers");
ProjectContextEvent.ONLINE_MEMBER_JOINED = new ProjectContextEvent("ONLINE_MEMBER_JOINED", "memberJoined");
ProjectContextEvent.ONLINE_MEMBER_LEFT = new ProjectContextEvent("ONLINE_MEMBER_LEFT", "memberLeft");
ProjectContextEvent.ONLINE_GUEST_JOINED = new ProjectContextEvent("ONLINE_GUEST_JOINED", "guestJoined");
ProjectContextEvent.ONLINE_GUEST_LEFT = new ProjectContextEvent("ONLINE_GUEST_JOINED", "guestLeft");

// User events - Interaction

ProjectContextEvent.ONLINE_MEMBER_POSITION_UPDATE = new ProjectContextEvent("ONLINE_MEMBER_POSITION_UPDATE", "positionUpdate");

// Do not allow changes
Object.freeze(ProjectContextEvent);
