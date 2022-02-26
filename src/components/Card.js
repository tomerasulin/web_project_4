/***
 * A Card class that creates a card with text and an image link
 */
class Card {
  constructor(data, handleCardClick, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector(".element__like-btn");
    this._cardImage = this._element.querySelector(".element__image");
    this._deleteBtn = this._element.querySelector(".element__delete-btn");
    this._text = this._element.querySelector(".element__text");
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
    this._cardImage.addEventListener("click", this._handleCardClick);
    this._likeBtn.addEventListener("click", this._handleLikeButton);
    this._deleteBtn.addEventListener("click", this._handleDeleteButton);
  }

  /**
   * function that handle the like button once it pressed
   */
  _handleLikeButton = () => {
    this._likeBtn.classList.toggle("element__like-btn_active");
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
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._text.textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
