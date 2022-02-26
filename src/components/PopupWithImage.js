import Popup from "./Popup.js";

/**
 * This class is a child class of Popup class
 * this class has to change the parent open() method of the Popup class
 */
export default class PopupWithImage extends Popup {
  open({ link, name }) {
    this._caption.textContent = name;
    this._img.src = link;
    this._img.alt = name;
    super.open(); // call the parent open() method
  }
}
