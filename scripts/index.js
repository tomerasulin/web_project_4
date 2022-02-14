// imports
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { closePopup, openPopup } from "./utils.js";
import { initialCards } from "./cards.js";

// declaring variables
const popupBox = document.querySelectorAll(".popup-box");
const openEditPopup = document.querySelector(".profile__edit-btn");
const openAddPopup = document.querySelector(".profile__add-btn");
const editForm = document.querySelector(".popup-box__form_edit");
export const addForm = document.querySelector(".popup-box__form_add");
export const elementsList = document.querySelector(".elements__list");
const userInputName = document.querySelector(".popup-box__input_type_name");
const userInputAbout = document.querySelector(".popup-box__input_type_about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__role");
const editPopup = document.querySelector(".popup-box_type_edit");
const addPopup = document.querySelector(".popup-box_type_add");
const userInputTitle = document.querySelector(".popup-box__input_type_title");
const userInputImageLink = document.querySelector(
  ".popup-box__input_type_image-link"
);

// settings for validation
const settings = {
  inputSelector: ".popup-box__input",
  submitButtonSelector: ".popup-box__save-btn",
  inactiveButtonClass: "popup-box__save-btn_disabled",
  inputErrorClass: "popup-box__input_type_error",
  errorClass: "popup-box__error_visible",
};

/**
 * function that create a six initial cards once the page is loading
 */
const createInitialCards = () => {
  initialCards.forEach((elem) =>
    elementsList.append(new Card(elem, "#element-template").generateCard())
  );
};

createInitialCards();

// validations
export const editFormValidator = new FormValidator(settings, editForm);
export const addFormValidator = new FormValidator(settings, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// event listeners
openEditPopup.addEventListener("click", handleEditButton);
openAddPopup.addEventListener("click", handleAddButton);
editForm.addEventListener("submit", handleProfileFormSubmit);
addForm.addEventListener("submit", handleAddingCardFormSubmit);

popupBox.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup-box__close-btn") ||
      evt.target.classList.contains("popup-box_opened")
    ) {
      closePopup(popup);
    }
  });
});

/**
 * function that handle the edit button once it pressed
 */
function handleEditButton() {
  userInputName.value = profileName.textContent;
  userInputAbout.value = profileAbout.textContent;
  openPopup(editPopup);
  editFormValidator.reset();
}

/**
 * function that handle the add button once it pressed
 */
function handleAddButton() {
  openPopup(addPopup);
  addForm.reset();
  addFormValidator.reset();
}

/**
 * this function handle the form of edit profile
 * @param {*} evt
 */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = userInputName.value;
  profileAbout.textContent = userInputAbout.value;
  closePopup(editPopup);
}

/**
 * function that handle the form of adding a new card to the card list
 * @param {*} evt
 */
function handleAddingCardFormSubmit(evt) {
  evt.preventDefault();
  const cardToAdd = {
    name: userInputTitle.value,
    link: userInputImageLink.value,
  };
  const card = new Card(cardToAdd, "#element-template").generateCard();
  elementsList.prepend(card);
  closePopup(addPopup);
}
