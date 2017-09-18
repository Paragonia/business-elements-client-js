/**
 * Defines bout events.
 */
export default class BoutEvent {

  /**
   * Creates a new bout event.
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
    return `BoutEvent.${this.name}`;
  }
}

// Data events - bouts

BoutEvent.BOUT = new BoutEvent("BOUT", "bout");
BoutEvent.BOUT_STARTED = new BoutEvent("BOUT_STARTED", "boutStarted");
BoutEvent.BOUT_FINISHED = new BoutEvent("BOUT_FINISHED", "boutFinished");
BoutEvent.BOUT_DELETED = new BoutEvent("BOUT_DELETED", "boutDeleted");
BoutEvent.BOUT_THRESHOLD_REACHED = new BoutEvent("BOUT_THRESHOLD_REACHED", "boutThresholdReached");


// Do not allow changes
Object.freeze(BoutEvent);

