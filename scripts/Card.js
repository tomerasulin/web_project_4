//imports
import { openPopup } from "./utils.js";

//variables
const enlargePopup = document.querySelector(".popup-box_type_open");
const imageAddForm = enlargePopup.querySelector(".popup-box__image");
const textAddForm = enlargePopup.querySelector(".popup-box__text");

/***
 * A Card class that creates a card with text and an image link
 */
class Card {
  constructor(data, cardSelector) {
    this._text = data.name;
    this._image = data.link;

    this._cardSelector = cardSelector;
  }

  /**
   * build a card template
   * @returns a card template that represent a card on the webpage
   */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  /**
   * method that set event listeners for each handler
   */
  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", this._handleOpenImage);
    this._element
      .querySelector(".element__like-btn")
      .addEventListener("click", this._handleLikeButton);
    this._element
      .querySelector(".element__delete-btn")
      .addEventListener("click", this._handleDeleteButton);
  }

  /**
   * function that handle the click on image
   * @param {*} evt
   */
  _handleOpenImage(evt) {
     imageAddForm.src = evt.target.src;
    imageAddForm.alt = evt.target.alt;
    textAddForm.textContent = evt.currentTarget.alt;
    openPopup(enlargePopup);
  }

  /**
   * function that handle the like button once it pressed
   * @param {*} evt
   */
  _handleLikeButton(evt) {
    evt.target.classList.toggle("element__like-btn_active");
  }

  /**
   * function that handle the delete button once it pressed
   * @param {*} evt
   */
  _handleDeleteButton = (evt) => {
    evt.target.closest(".element").remove();
  };

  /**
   * this method create a new card to the webpage populated with data
   * @returns a new card
   */
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__image").src = this._image;
    this._element.querySelector(".element__image").alt = this._text;
    this._element.querySelector(".element__text").textContent = this._text;

    return this._element;
  }
}

export default Card;
