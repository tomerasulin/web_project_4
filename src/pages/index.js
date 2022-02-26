// imports
import "./index.css";
import Section from "../components/Section";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator.js";
import { settings, initialCards } from "../utils/constants.js";

//logos and pics imports
import logoSrc from "../images/HeaderLogo.svg";
import avatarSrc from "../images/Avatar.jpg";

// declaring variables
const editForm = document.querySelector(".popup-box__form_edit");
const addForm = document.querySelector(".popup-box__form_add");
const elementsList = document.querySelector(".elements__list");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__role");
const editPopup = document.querySelector(".popup-box_type_edit");
const addPopup = document.querySelector(".popup-box_type_add");
const enlargePopup = document.querySelector(".popup-box_type_open");
const userInputName = document.querySelector(".popup-box__input_type_name");
const userInputAbout = document.querySelector(".popup-box__input_type_about");
const openEditPopup = document.querySelector(".profile__edit-btn");
const openAddPopup = document.querySelector(".profile__add-btn");

// get the DOM elements of the logo and avatar
const logo = document.querySelector(".header__image");
const avatar = document.querySelector(".profile__avatar");

// set the logo and image of the page
logo.src = logoSrc;
avatar.src = avatarSrc;

// array of form validators
const formValidators = {};

//creating all the cards into the page
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement);
    },
  },
  elementsList
);

// call the render function
cardList.renderer();

// get the user info
const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileAbout,
});

const imagePopup = new PopupWithImage(enlargePopup);

/* ----------handling the forms for editing the profile box and and adding a new card */
const userInfoPopup = new PopupWithForm(editPopup, (data) => {
  userInfo.setUserInfo(data);
  userInfoPopup.close();
});

const newCardPopup = new PopupWithForm(addPopup, (data) => {
  const cardElement = createCard({
    name: data.title,
    link: data["image-link"],
  });
  cardList.addItem(cardElement);
  newCardPopup.close();
});

// set the event listeners
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();

/**
 * function that handle the edit button once it pressed
 */
function handleEditButton() {
  userInfoPopup.open();
  const info = userInfo.getUserInfo();
  userInputName.value = info.userName;
  userInputAbout.value = info.userJob;
  // editFormValidator.resetValidation();
  formValidators[editForm.getAttribute("name")].resetValidation();
}

/**
 * function that handle the add button once it pressed
 */
function handleAddButton() {
  newCardPopup.open();
  // addFormValidator.resetValidation();
  formValidators[addForm.getAttribute("name")].resetValidation();
}

// event listeners
openEditPopup.addEventListener("click", handleEditButton);
openAddPopup.addEventListener("click", handleAddButton);

// validations
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(".popup-box__form"));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

// function that create a card
function createCard(data) {
  const card = new Card(
    data,
    () => {
      imagePopup.open(data);
    },
    "#element-template"
  );

  const cardElement = card.generateCard();
  return cardElement;
}
