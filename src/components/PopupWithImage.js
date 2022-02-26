import Popup from "./Popup.js";

/**
 * This class is a child class of Popup class
 * this class has to change the parent open() method of the Popup class
 */
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._caption = this._popup.querySelector(".popup-box__text");
    this._img = this._popup.querySelector(".popup-box__image");
  }
  open({ link, name }) {
    this._caption.textContent = name;
    this._img.src = link;
    this._img.alt = name;
    super.open(); // call the parent open() method
  }
}
