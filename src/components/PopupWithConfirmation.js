import Popup from "./Popup.js";

/**
 * This class handle the delete card form
 */
export default class PopupWithConfirmation extends Popup {
  constructor(popup, buttonText, loadingButtonText) {
    super(popup);
    this._buttonText = buttonText;
    this._loadingButtonText = loadingButtonText;
    this._button = this._popup.querySelector(".popup-box__save-btn");
  }

  setAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
    super.setEventListeners();
  }

  showLoading() {
    this._button.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._button.textContent = this._buttonText;
  }
}
