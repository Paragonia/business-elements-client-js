/**
 * Defines contact methods.
 */
export default class ContactMethod {

  /**
   * Creates a new contact method.
   *
   * @param {String} name to use for the contact method.
   */
  constructor(name) {

    /**
     * @type {String} Stores the name.
     * @private
     */
    this._name = name;

  }

  /**
   * @returns {String} name of the contact method.
   */
  get name() {
    return this._name;
  }

  /**
   * @returns {string} representation of this enum.
   */
  toString() {
    return `ContactMethod.${this.name}`;
  }
}

ContactMethod.EMAIL = new ContactMethod("Email");


// Do not allow changes
Object.freeze(ContactMethod);
