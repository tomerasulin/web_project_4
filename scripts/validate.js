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
 * @param {*} formElement
 * @param {*} inputElement
 * @param {*} errorMessage
 */
const showInputError = (
  { inputErrorClass, errorClass },
  formElement,
  inputElement,
  errorMessage
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

/**
 * this function hide the error message
 * @param {*} formElement
 * @param {*} inputElement
 */
const hideInputError = (
  { inputErrorClass, errorClass },
  formElement,
  inputElement
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

/**
 * this function check the validation of an input field and show/hide the error message
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
 * @param {*} inputList
 * @param {*} buttonElement
 */
const toggleButtonState = (
  { inactiveButtonClass },
  inputList,
  buttonElement
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

/**
 * this function gets the settings object and a form
 * and set an event listeners to all inputs inside the form
 * toggling the button(active and inactive) and check validation
 * @param {*} formElement
 */
const setEventListeners = (
  { inputSelector, submitButtonSelector, ...settings },
  formElement
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(settings, inputList, buttonElement);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      toggleButtonState(settings, inputList, buttonElement);
      checkInputValidity(settings, formElement, input);
    });
  });
};

/**
 * this function will reset all validation state
 */
export const reset = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);
    toggleButtonState(settings, inputList, button);
    inputList.forEach((input) => {
      hideInputError(settings, form, input);
    });
  });
};

/**
 * this function validate the forms in our page
 */
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(".popup-box__form"));
  formList.forEach((form) => {
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
