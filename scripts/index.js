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

// declaring variables
const popupBox = document.querySelectorAll(".popup-box");
const editPopup = document.querySelector(".popup-box_type_edit");
const addPopup = document.querySelector(".popup-box_type_add");
const enlargePopup = document.querySelector(".popup-box_type_open");
const openEditPopup = document.querySelector(".profile__edit-btn");
const openAddPopup = document.querySelector(".profile__add-btn");
const closeBtn = document.querySelectorAll(".popup-box__close-btn");
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
const elementsTemplate = document.querySelector("#element-template").content;

// function that handle the popup window
function togglePopup(popup) {
  popup.classList.toggle("popup-box_opened");
}

// function that handle the edit button
function handleEditButton() {
  userInputName.value = profileName.textContent;
  userInputAbout.value = profileAbout.textContent;
  togglePopup(editPopup);
}

//function that handle the add button
function handleAddButton() {
  userInputTitle.value = "";
  userInputImageLink.value = "";
  togglePopup(addPopup);
}

//fucntion that handle all popups to be closed
function closePopup() {
  popupBox.forEach((popup) => {
    if (popup.classList.contains("popup-box_opened")) {
      togglePopup(popup);
    }
  });
}

// this function handle the save buttom while the user enter input
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = userInputName.value;
  profileAbout.textContent = userInputAbout.value;
  togglePopup(editPopup);
}

//function that handle the form submission of adding a new card
function handleAddingCardFormSubmit(evt) {
  evt.preventDefault();
  const card = createElement(userInputTitle.value, userInputImageLink.value);
  document.querySelector(".elements__list").prepend(card);
  togglePopup(addPopup);
}

//function that handle the like button once it clicked
function handleLikeButton(evt) {
  evt.target.classList.toggle("element__like-btn_active");
}

//function that handle the delete button once it clicked
const handleDeleteButton = (evt) => {
  evt.target.closest(".element").remove();
};

//function that create an element
const createElement = (name, link) => {
  const element = elementsTemplate.cloneNode(true);
  const test = element.querySelector(".element__image");
  const likeBtn = element.querySelector(".element__like-btn");
  const deleteBtn = element.querySelector(".element__delete-btn");
  test.src = link;
  test.alt = name;
  test.onclick = handleOpenImage;
  element.querySelector(".element__text").textContent = name;
  likeBtn.addEventListener("click", handleLikeButton);
  deleteBtn.addEventListener("click", handleDeleteButton);
  return element;
};

//function that handle the click on image event
const handleOpenImage = (evt) => {
  enlargePopup.querySelector(".popup-box__image").src = evt.srcElement.src;
  enlargePopup.querySelector(".popup-box__image").alt = evt.srcElement.alt;
  enlargePopup.querySelector(".popup-box__text").textContent =
    evt.srcElement.alt;
  togglePopup(enlargePopup);
};

//function that create a six initial cards when the page is loaded
const createInitialCards = () => {
  const elementsList = document.querySelector(".elements__list");
  initialCards.forEach((elem) => {
    elementsList.append(createElement(elem.name, elem.link));
  });
};

//call the function once the page is loading
createInitialCards();

// event listeners
openEditPopup.addEventListener("click", handleEditButton);
openAddPopup.addEventListener("click", handleAddButton);
editForm.addEventListener("submit", handleProfileFormSubmit);
addForm.addEventListener("submit", handleAddingCardFormSubmit);

// handling the close buttons
closeBtn.forEach((btn) => {
  btn.addEventListener("click", closePopup);
});
