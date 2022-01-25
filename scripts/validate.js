export const settings = {
  formSelector: ".popup-box__form",
  inputSelector: ".popup-box__input",
  submitButtonSelector: ".popup-box__save-btn",
  inactiveButtonClass: "popup-box__save-btn_disabled",
  inputErrorClass: "popup-box__input_type_error",
  errorClass: "popup-box__error_visible",
};

/**
 * this function show the error message
 * @param {*} settings
 * @param {*} formElement
 * @param {*} inputElement
 * @param {*} errorMessage
 */
const showInputError = (settings, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

/**
 * this function hide the error message
 * @param {*} settings
 * @param {*} formElement
 * @param {*} inputElement
 */
const hideInputError = (settings, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

/**
 * this function check the validation of an input field and show/hide the error message
 * @param {*} settings
 * @param {*} formElement
 * @param {*} inputElement
 */
const checkInputValidity = (settings, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      settings,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(settings, formElement, inputElement);
  }
};

/**
 * this function return the validity of an input field
 * @param {*} inputList
 * @returns
 */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/**
 * this function checks if an input field is valid
 * in case of true the button turn to be inactive otherwise it turns to be active
 * @param {*} settings
 * @param {*} inputList
 * @param {*} buttonElement
 */
const toggleButtonState = (settings, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

/**
 * this function gets the settings object and a form
 * and set an event listeners to all inputs inside the form
 * toggling the button(active and inactive) and check validation
 * @param {*} settings
 * @param {*} formElement
 */
const setEventListeners = (settings, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  toggleButtonState(settings, inputList, buttonElement);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      toggleButtonState(settings, inputList, buttonElement);
      checkInputValidity(settings, formElement, input);
    });
  });
};

/**
 * this function validate the forms in our page
 * @param {*} settings
 */
const enableValidation = (settings) => {
  const formElement = Array.from(
    document.querySelectorAll(settings.formSelector)
  );
  formElement.forEach((form) => {
    setEventListeners(settings, form);
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  });
};

/**
 * calling to the enableValidation function with all settings
 */
enableValidation(settings);

/**
 * this function will reset all validation state
 * @param {*} settings
 */
export const reset = (settings) => {
  const formList = Array.from(document.querySelectorAll(".popup-box__form"));
  formList.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(".popup-box__input"));
    const button = form.querySelector(".popup-box__save-btn");
    inputList.forEach((input) => {
      hideInputError(settings, form, input);
      toggleButtonState(settings, inputList, button);
    });
  });
};
