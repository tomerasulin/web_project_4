/**
 * this class opens and closes the popup window
 */
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add("popup-box_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove("popup-box_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup-box__close-btn") ||
        evt.target.classList.contains("popup-box_opened")
      ) {
        this.close();
      }
    });
  }
}
