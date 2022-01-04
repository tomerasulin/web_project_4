let popupBox = document.querySelector('.popup-box');
let openPopup = document.querySelector('.profile-info__edit-btn');
let closePopup = document.querySelector('.popup-box__close-btn');
let saveBtn = document.querySelector('.popup-box__save-btn');
let likeBtn = document.querySelectorAll('.element__like-btn');
let profileName = document.querySelector('.profile-info__name');
let profileAbout = document.querySelector('.profile-info__role');

console.log(profileName.textContent);

function togglePopup(){
    popupBox.classList.toggle('popup-box_opened');
    let name = document.querySelector('.popup-box__input_type_name');
    let about = document.querySelector('.popup-box__input_type_about');
    name.value = profileName.textContent;
    about.value = profileAbout.textContent;
}

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);


function activateLikeButton(ind){
  if(likeBtn[ind].getAttribute('src') === './images/Like Logo.svg'){
    likeBtn[ind].setAttribute('src', './images/ActiveLike.svg');
  }else{
    likeBtn[ind].setAttribute('src', './images/Like Logo.svg');
  }
}

// Let's find the form in the DOM
let formElement = document.querySelector('.popup-box__form');

// Next is the form submit handler, though
// it won't submit anywhere just yet

// Note that the function name starts with a verb
// and describes exactly what the function does
function handleProfileFormSubmit(evt) {
  // This line stops the browser from 
  // submitting the form in the default way.
  evt.preventDefault();
    // Having done so, we can define our own way of submitting the form.
    // We'll explain it in more detail later.

    // Let's find the form fields in the DOM
    let nameInput = document.querySelector('.popup-box__input_type_name');
    let jobInput = document.querySelector('.popup-box__input_type_about');

    // Get the values of each field from the corresponding value property

    let name = nameInput.value;
    let about = jobInput.value;
    // Select elements where the field values will be entered

    let newName = document.querySelector('.profile-info__name');
    let newAbout = document.querySelector('.profile-info__role');
    // Insert new values using the textContent 
    // property of the querySelector() method
    newName.textContent = name;
    newAbout.textContent = about;

}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleProfileFormSubmit);
saveBtn.addEventListener('click', togglePopup);