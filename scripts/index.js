const popupBox = document.querySelector(".popup-box");
const openPopup = document.querySelector(".profile-info__edit-btn");
const closePopup = document.querySelector(".popup-box__close-btn");
const saveBtn = document.querySelector(".popup-box__save-btn");
const likeBtn = document.querySelectorAll(".element__like-btn");
const profileName = document.querySelector(".profile-info__name");
const profileAbout = document.querySelector(".profile-info__role");
const userInputName = document.querySelector(".popup-box__input_type_name");
const userInputAbout = document.querySelector(".popup-box__input_type_about");

function togglePopup() {
  popupBox.classList.toggle("popup-box_opened");
}

function handleEditButton(){
  userInputName.value = profileName.textContent;
  userInputAbout.value = profileAbout.textContent;
  togglePopup();
}

openPopup.addEventListener("click", handleEditButton);
closePopup.addEventListener("click", togglePopup);

function activateLikeButton(ind) {
  if (likeBtn[ind].getAttribute("src") === "./images/Like Logo.svg") {
    likeBtn[ind].setAttribute("src", "./images/ActiveLike.svg");
  } else {
    likeBtn[ind].setAttribute("src", "./images/Like Logo.svg");
  }
}

const formElement = document.querySelector(".popup-box__form");
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = userInputName.value;
  profileAbout.textContent = userInputAbout.value;
  togglePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);

