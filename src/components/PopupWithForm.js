import Popup from "./Popup.js";

/**
 * This class is a child class of the Popup class
 */
export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._popupForm = this._popup.querySelector(".popup-box__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupForm.querySelectorAll(".popup-box__input");
    this._button = this._popupForm.querySelector(".popup-box__save-btn");
  }

  /**
   * this method collects data from all the input fields and returns that data as an object
   * @returns the data of all input fields
   */
  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._button.name === "save") {
        this._button.textContent = "Saving...";
      } else {
        this._button.textContent = "Creating...";
      }
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    if (this._button.textContent === "Saving...") {
      this._button.textContent = "Save";
    } else {
      this._button.textContent = "Create";
    }
    super.close();
  }
}
