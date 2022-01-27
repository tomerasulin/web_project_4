export const settings = {
  formSelector: ".popup-box__form",
  inputSelector: ".popup-box__input",
  submitButtonSelector: ".popup-box__save-btn",
  inactiveButtonClass: "popup-box__save-btn_disabled",
  inputErrorClass: "popup-box__input_type_error",
  errorClass: "popup-box__error_visible",
};

const {
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
} = settings;

const formList = Array.from(document.querySelectorAll(".popup-box__form"));


/**
 * this function show the error message
 * @param {*} formElement
 * @param {*} inputElement
 * @param {*} errorMessage
 */
const showInputError = (formElement, inputElement, errorMessage) => {
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
const hideInputError = (formElement, inputElement) => {
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
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(formElement, inputElement);
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
const toggleButtonState = (inputList, buttonElement) => {
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
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(inputSelector)
  );
  const buttonElement = formElement.querySelector(
    submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, input);
    });
  });
};

/**
 * this function validate the forms in our page
 */
const enableValidation = () => {
  const formElement = Array.from(
    document.querySelectorAll(formSelector)
  );
  formElement.forEach((form) => {
    setEventListeners(form);
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
 */
export const reset = () => {
  formList.forEach((form) => {
    form.reset();
    setEventListeners(form);
  });
};
