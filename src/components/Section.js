/**
 * This class render a list of elements on a page
 */
export default class Section {
    // items serves as an array of data
    // renderer responsible for creating and rendering data on a page
  constructor({ items, renderer }, cssSelector) {
    this._items = items;
    this._renderer = renderer;

    this._cssSelector = cssSelector;
  }

  renderer() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._cssSelector.prepend(element);
  }
}
