/**
 * Defines the types of Interaction Content.
 */
export default class InteractionContent {
  constructor(name, data) {
    const _name = name;
    const _data = data;

    this.jsonObject = function () {
      return {
        type: _name,
        data: _data
      };
    };
  }

  /**
   * Construct a Textual InteractionContent
   * @param text the text
   * @returns {InteractionContent}
   */
  static getTextInstance(text) {
    if (!(typeof text === "string")) {
      throw new Error("Text is required and needs to be of type String");
    }
    return new InteractionContent("TextContent", {
      text: text
    });
  }

  /**
   * Check whether the provided object is of type {InteractionContent}
   * @param obj the object to test against
   * @returns {boolean}
   */
  static isOfSameType(obj) {
    return obj instanceof InteractionContent;
  }
}
