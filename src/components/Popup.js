/**
 * this class opens and closes the popup window
 */
export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._caption = this._popup.querySelector(".popup-box__text");
    this._img = this._popup.querySelector(".popup-box__image");
  }

  open() {
    this._popup.classList.add("popup-box_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup-box_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup-box__close-btn") ||
        evt.target.classList.contains("popup-box_opened")
      ) {
        this.close();
      }
    });
  }
}
