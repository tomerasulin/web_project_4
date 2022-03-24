// imports
import "./index.css";
import Section from "../components/Section";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import FormValidator from "../components/FormValidator.js";
import { settings } from "../utils/constants.js";
import Api from "../utils/Api";

//logo
import logoSrc from "../images/HeaderLogo.svg";

// declaring variables
const editForm = document.querySelector(".popup-box__form_edit");
const addForm = document.querySelector(".popup-box__form_add");
const changeForm = document.querySelector(".popup-box__form_change");
const elementsList = document.querySelector(".elements__list");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__role");
const profileAvatar = document.querySelector(".profile__avatar");
const editPopup = document.querySelector(".popup-box_type_edit");
const addPopup = document.querySelector(".popup-box_type_add");
const changePopup = document.querySelector(".popup-box_type_change");
const enlargePopup = document.querySelector(".popup-box_type_open");
const userInputName = document.querySelector(".popup-box__input_type_name");
const userInputAbout = document.querySelector(".popup-box__input_type_about");
const openEditPopup = document.querySelector(".profile__edit-btn");
const openAddPopup = document.querySelector(".profile__add-btn");
const openProfileAvatarEdit = document.querySelector(".profile__avatar-edit");
const deletePopup = document.querySelector(".popup-box_type_delete");
const logo = document.querySelector(".header__image");

// set the logo and image of the page
logo.src = logoSrc;

// creating an Api variable for communicate with the server
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "51cb9d12-6e1a-4c88-9721-b40c0e542029",
    "Content-Type": "application/json",
  },
});

// create a let variable to
let userId;

api
  .init()
  .then(([cardData, userData]) => {
    userId = userData._id;
    cardList.renderer(cardData);
    userInfo.setUserInfo(userData);
  })
  .catch(console.log);

// get the user info
const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileAbout,
  avatar: profileAvatar,
});

// array of form validators
const formValidators = {};

//creating all the cards into the page
const cardList = new Section(
  {
    renderer: (data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement);
    },
  },
  elementsList
);

const imagePopup = new PopupWithImage(enlargePopup);

const deleteCardPopup = new PopupWithConfirmation(
  deletePopup,
  "Yes",
  "Loading..."
);

const userInfoPopup = new PopupWithForm(
  editPopup,
  (data) => {
    userInfoPopup.showLoading();
    api
      .editProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        userInfoPopup.close();
      })
      .catch(console.log)
      .finally(() => {
        userInfoPopup.hideLoading();
      });
  },
  "Save",
  "Saving..."
);

const newCardPopup = new PopupWithForm(
  addPopup,
  (data) => {
    newCardPopup.showLoading();
    api
      .addCard({ name: data.title, link: data["image-link"] })
      .then((res) => {
        const cardElement = createCard(res);
        cardList.addItem(cardElement);
        newCardPopup.close();
      })
      .catch(console.log)
      .finally(() => {
        newCardPopup.hideLoading();
      });
  },
  "Create",
  "Creating..."
);

const changeProfilePicPopup = new PopupWithForm(
  changePopup,
  (data) => {
    changeProfilePicPopup.showLoading();
    api
      .updateProfilePic(data)
      .then(() => {
        userInfo.setAvatar(data);
        changeProfilePicPopup.close();
      })
      .catch(console.log)
      .finally(() => {
        changeProfilePicPopup.hideLoading();
      });
  },
  "Save",
  "Saving..."
);

// set the event listeners
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();
changeProfilePicPopup.setEventListeners();
deleteCardPopup.setEventListeners();

/**
 * function that handle the edit button once it pressed
 */
function handleEditButton() {
  userInfoPopup.open();
  const info = userInfo.getUserInfo();
  userInputName.value = info.userName;
  userInputAbout.value = info.userJob;
  formValidators[editForm.getAttribute("name")].resetValidation();
}

/**
 * function that handle the add button once it pressed
 */
function handleAddButton() {
  newCardPopup.open();
  formValidators[addForm.getAttribute("name")].resetValidation();
}

/**
 * function that handle the change avatar pic once it pressed
 */
function handleAvatarEditButton() {
  changeProfilePicPopup.open();
  formValidators[changeForm.getAttribute("name")].resetValidation();
}

// event listeners
openEditPopup.addEventListener("click", handleEditButton);
openAddPopup.addEventListener("click", handleAddButton);
openProfileAvatarEdit.addEventListener("click", handleAvatarEditButton);

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
    (id) => {
      deleteCardPopup.open();
      deleteCardPopup.setAction(() => {
        deleteCardPopup.showLoading();
        api
          .deleteCard(id)
          .then(() => {
            card.removeCard();
            deleteCardPopup.close();
          })
          .catch(console.log)
          .finally(() => {
            deleteCardPopup.hideLoading();
          });
      });
    },
    (id) => {
      if (card.isLiked()) {
        api
          .dislikeCard(id)
          .then((res) => {
            card.likeCard(res.likes);
          })
          .catch(console.log);
      } else {
        api
          .likeCard(id)
          .then((res) => {
            card.likeCard(res.likes);
          })
          .catch(console.log);
      }
    },
    "#element-template",
    userId
  );

  const cardElement = card.generateCard();
  return cardElement;
}
