import { reset, settings } from "./validate.js";
import { initialCards } from "./cards.js";

// declaring variables
const popupBox = document.querySelectorAll(".popup-box");
const editPopup = document.querySelector(".popup-box_type_edit");
const addPopup = document.querySelector(".popup-box_type_add");
const enlargePopup = document.querySelector(".popup-box_type_open");
const openEditPopup = document.querySelector(".profile__edit-btn");
const openAddPopup = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__role");
const userInputName = document.querySelector(".popup-box__input_type_name");
const userInputAbout = document.querySelector(".popup-box__input_type_about");
const userInputTitle = document.querySelector(".popup-box__input_type_title");
const userInputImageLink = document.querySelector(
  ".popup-box__input_type_image-link"
);
const editForm = document.querySelector(".popup-box__form_edit");
const addForm = document.querySelector(".popup-box__form_add");
const elementTemplate = document.querySelector("#element-template").content;
const elementsList = document.querySelector(".elements__list");
const imageAddForm = enlargePopup.querySelector(".popup-box__image");
const textAddForm = enlargePopup.querySelector(".popup-box__text");

/**
 * function that receives a popup box and make it visible to the user
 * @param {*} popup
 */
const openPopup = (popup) => {
  popup.classList.add("popup-box_opened");
  document.addEventListener("keydown", keyHandler);
  reset(settings);
};

/**
 * function that recevies a popup box and make it invisible to the user
 * @param {*} popup
 */
const closePopup = (popup) => {
  popup.classList.remove("popup-box_opened");
  document.removeEventListener("keydown", keyHandler);
};

/**
 * function that handle the edit button once it pressed
 */
function handleEditButton() {
  userInputName.value = profileName.textContent;
  userInputAbout.value = profileAbout.textContent;
  openPopup(editPopup);
}

/**
 * function that handle the add button once it pressed
 */
function handleAddButton() {
  openPopup(addPopup);
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
  const card = createElement(cardToAdd);
  elementsList.prepend(card);
  closePopup(addPopup);
}

/**
 * function that handle the like button once it pressed
 * @param {*} evt
 */
function handleLikeButton(evt) {
  evt.target.classList.toggle("element__like-btn_active");
}

/**
 * function that handle the delete button once it pressed
 * @param {*} evt
 */
const handleDeleteButton = (evt) => {
  evt.target.closest(".element").remove();
};

//function that create an element
/**
 * function that receives a name and a link of a new card and create it
 * @param {name, link} card
 * @returns a new card
 */
const createElement = (card) => {
  const element = elementTemplate.cloneNode(true);
  const image = element.querySelector(".element__image");
  const likeBtn = element.querySelector(".element__like-btn");
  const deleteBtn = element.querySelector(".element__delete-btn");
  const text = element.querySelector(".element__text");
  image.src = card.link;
  image.alt = card.name;
  image.addEventListener("click", handleOpenImage);
  text.textContent = card.name;
  likeBtn.addEventListener("click", handleLikeButton);
  deleteBtn.addEventListener("click", handleDeleteButton);

  return element;
};

/**
 * function that handle the click on image
 * @param {*} evt
 */
const handleOpenImage = (evt) => {
  imageAddForm.src = evt.target.src;
  imageAddForm.alt = evt.target.alt;
  textAddForm.textContent = evt.currentTarget.alt;
  openPopup(enlargePopup);
};

/**
 * function that create a six initial cards once the page is loading
 */
const createInitialCards = () => {
  initialCards.forEach((elem) => elementsList.append(createElement(elem)));
};

createInitialCards();

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
