/**
 * Defines activity-stream event.
 */
export default class ActivityStreamEvent {

  /**
   * Creates a new activity-stream event.
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
    return `ActivityStreamEvent.${this.name}`;
  }
}

// event types

ActivityStreamEvent.ACTIVITY_STREAM = new ActivityStreamEvent("ACTIVITY_STREAM", "activitystream");


// Do not allow changes
Object.freeze(ActivityStreamEvent);

