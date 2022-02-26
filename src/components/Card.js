/***
 * A Card class that creates a card with text and an image link
 */
class Card {
  constructor(data, handleCardClick, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;

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
      .addEventListener("click", this._handleCardClick);
    this._element
      .querySelector(".element__like-btn")
      .addEventListener("click", this._handleLikeButton);
    this._element
      .querySelector(".element__delete-btn")
      .addEventListener("click", this._handleDeleteButton);
  }

  /**
   * function that handle the like button once it pressed
   */
  _handleLikeButton = () => {
    this._element
      .querySelector(".element__like-btn")
      .classList.toggle("element__like-btn_active");
  };

  /**
   * function that handle the delete button once it pressed
   */
  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  };

  /**
   * this method create a new card to the webpage populated with data
   * @returns a new card
   */
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__text").textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
