/**
 * This class render a list of elements on a page
 */
export default class Section {
  // items serves as an array of data
  // renderer responsible for creating and rendering data on a page
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;

    this._container = container;
  }

  renderer() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(card) {
    this._container.prepend(card);
  }
}
