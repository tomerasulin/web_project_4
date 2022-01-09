// declaring variables
const popupBox = document.querySelector(".popup-box");
const openPopup = document.querySelector(".profile__edit-btn");
const closePopup = document.querySelector(".popup-box__close-btn");
const likeBtn = document.querySelectorAll(".element__like-btn");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__role");
const userInputName = document.querySelector(".popup-box__input_type_name");
const userInputAbout = document.querySelector(".popup-box__input_type_about");
const formElement = document.querySelector(".popup-box__form");

// function that handle the popup window
function togglePopup() {
  popupBox.classList.toggle("popup-box_opened");
}

// function that handle the edit button while a user press it
function handleEditButton(){
  userInputName.value = profileName.textContent;
  userInputAbout.value = profileAbout.textContent;
  togglePopup();
}

// this function handle the save buttom while the user enter input
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = userInputName.value;
  profileAbout.textContent = userInputAbout.value;
  togglePopup();
}

// event listeners 
openPopup.addEventListener("click", handleEditButton);
closePopup.addEventListener("click", togglePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);

