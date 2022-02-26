import Popup from "./Popup.js";

/**
 * This class is a child class of the Popup class
 */
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._popupForm = this._popupSelector.querySelector(".popup-box__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  /**
   * this method collects data from all the input fields and returns that data as an object
   * @returns the data of all input fields
   */
  _getInputValues() {
    const inputValues = {};
    const inputs = [...this._popupForm.querySelectorAll(".popup-box__input")];

    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
