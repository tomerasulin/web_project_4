/**
 * This class render a list of elements on a page
 */
export default class Section {
  // renderer responsible for creating and rendering data on a page
  constructor({ renderer }, container) {
    this._renderer = renderer;

    this._container = container;
  }

  renderer(items) {
    items.forEach((item) => this._renderer(item));
  }

  addItem(card) {
    this._container.prepend(card);
  }
}
