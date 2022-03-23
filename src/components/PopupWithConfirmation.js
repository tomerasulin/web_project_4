import Popup from "./Popup.js";

/**
 * This class handle the delete card form
 */
export default class PopupWithConfirmation extends Popup {
  setAction(action) {
    this._submitHandler = action;
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
    super.setEventListeners();
  }
}
