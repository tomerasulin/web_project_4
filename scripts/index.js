// imports
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  handleEditButton,
  handleAddButton,
  handleProfileFormSubmit,
  handleAddingCardFormSubmit,
  closePopup,
} from "./utils.js";

// declaring variables
const popupBox = document.querySelectorAll(".popup-box");
const openEditPopup = document.querySelector(".profile__edit-btn");
const openAddPopup = document.querySelector(".profile__add-btn");
const editForm = document.querySelector(".popup-box__form_edit");
export const addForm = document.querySelector(".popup-box__form_add");
export const elementsList = document.querySelector(".elements__list");

//six initial cards
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

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
    if (evt.target.classList.contains("popup-box__close-btn")) {
      closePopup(popup);
    }
  });
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup-box_opened")) {
      closePopup(popup);
    }
  });
});

