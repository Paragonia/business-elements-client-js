/**
 * Defines concept categories.
 */
export default class ConceptCategory {

  /**
   * Creates a new concept category.
   *
   * @param {String} name to use for the category.
   */
  constructor(name) {

    /**
     * @type {String} Stores the name.
     * @private
     */
    this._name = name;

  }

  /**
   * @returns {String} name of the category.
   */
  get name() {
    return this._name;
  }

  /**
   * @returns {string} representation of this enum.
   */
  toString() {
    return `ConceptCategory.${this.name}`;
  }
}

// Data categories - concepts

ConceptCategory.OBJECT = new ConceptCategory("Object");
ConceptCategory.PROCESS = new ConceptCategory("Process");
ConceptCategory.SCHEMA = new ConceptCategory("Schema");
ConceptCategory.SCRIPT = new ConceptCategory("Script");
ConceptCategory.JUNCTURE = new ConceptCategory("Juncture");
ConceptCategory.PARTICIPATION = new ConceptCategory("Participation");
ConceptCategory.DESCRIPTION = new ConceptCategory("Description");
ConceptCategory.HISTORY = new ConceptCategory("History");
ConceptCategory.STRUCTURE = new ConceptCategory("Structure");
ConceptCategory.SITUATION = new ConceptCategory("Situation");
ConceptCategory.REASON = new ConceptCategory("Reason");
ConceptCategory.PURPOSE = new ConceptCategory("Purpose");


// Do not allow changes
Object.freeze(ConceptCategory);
