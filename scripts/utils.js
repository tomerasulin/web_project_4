// imports
import {
  addForm,
  elementsList,
  editFormValidator,
  addFormValidator,
} from "./index.js";
import Card from "./Card.js";

// variables 
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

/**
 * function that receives a popup box and make it visible to the user
 * @param {*} popup
 */
export const openPopup = (popup) => {
  popup.classList.add("popup-box_opened");
  document.addEventListener("keydown", keyHandler);
};

/**
 * function that recevies a popup box and make it invisible to the user
 * @param {*} popup
 */
export const closePopup = (popup) => {
  popup.classList.remove("popup-box_opened");
  document.removeEventListener("keydown", keyHandler);
};

/**
 * this function gets the event object and once there is a keydown event it checks
 * whether the key is an escape key, in case it is the popup window will be close
 * @param {} evt
 */
const keyHandler = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup-box_opened");
    closePopup(popup);
  }
};

/**
 * function that handle the edit button once it pressed
 */
export function handleEditButton() {
  userInputName.value = profileName.textContent;
  userInputAbout.value = profileAbout.textContent;
  openPopup(editPopup);
  editFormValidator.reset();
}

/**
 * function that handle the add button once it pressed
 */
export function handleAddButton() {
  openPopup(addPopup);
  addForm.reset();
  addFormValidator.reset();
}

/**
 * this function handle the form of edit profile
 * @param {*} evt
 */
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = userInputName.value;
  profileAbout.textContent = userInputAbout.value;
  closePopup(editPopup);
}

/**
 * function that handle the form of adding a new card to the card list
 * @param {*} evt
 */
export function handleAddingCardFormSubmit(evt) {
  evt.preventDefault();
  const cardToAdd = {
    name: userInputTitle.value,
    link: userInputImageLink.value,
  };
  const card = new Card(cardToAdd, "#element-template").generateCard();
  elementsList.prepend(card);
  closePopup(addPopup);
}
