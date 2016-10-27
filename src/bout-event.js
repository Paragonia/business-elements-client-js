/**
 * Defines bout events.
 */
export default class BoutEvent {

  /**
   * Creates a new bout event.
   *
   * @param {String} name to use for the event.
   * @param {String} bout emitted in the event.
   */
  constructor(name, bout) {

    /**
     * @type {String} Stores the name.
     * @private
     */
    this._name = name;


    /**
     * @type {String} Stores the bout.
     * @private
     */
    this._bout = bout;
  }

  /**
   * @returns {String} name of the event.
   */
  get name() {
    return this._name;
  }

  /**
   * @returns {String} bout of the event.
   */
  get bout() {
    return this._bout;
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

