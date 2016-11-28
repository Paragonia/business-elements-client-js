/**
 * Defines relation categories.
 */
export default class RelationCategory {

  /**
   * Creates a new relation category.
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
    return `RelationCategory.${this.name}`;
  }
}

// Data categories - relations

RelationCategory.CATEGORIZATION = new RelationCategory("Categorization");
RelationCategory.ATTRIBUTION = new RelationCategory("Attribution");
RelationCategory.CONSTRUCTION = new RelationCategory("Construction");
RelationCategory.COMPOSITION = new RelationCategory("Composition");
RelationCategory.CONSTITUTION = new RelationCategory("Constitution");
RelationCategory.MEMBERSHIP = new RelationCategory("Membership");
RelationCategory.FORMULATION = new RelationCategory("Formulation");
RelationCategory.SPATIALIZATION = new RelationCategory("Spatialization");
RelationCategory.OPERATION = new RelationCategory("Operation");
RelationCategory.ASSOCIATION = new RelationCategory("Association");


// Do not allow changes
Object.freeze(RelationCategory);
