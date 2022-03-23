/***
 * A Card class that creates a card with text and an image link
 */
class Card {
  constructor(
    data,
    handleCardClick,
    handleDeleteButton,
    handleLikeButton,
    cardSelector,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLikeButton;
    this._cardSelector = cardSelector;
    this._likes = data.likes;
    this._id = data._id;
    this._element = this._getTemplate();
    this._showLikes = this._element.querySelector(".element__show-likes");
    this._likeBtn = this._element.querySelector(".element__like-btn");
    this._cardImage = this._element.querySelector(".element__image");
    this._deleteBtn = this._element.querySelector(".element__delete-btn");
    this._text = this._element.querySelector(".element__text");
    this._userId = userId;
    this._ownerId = data.owner._id;
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
    this._likeBtn.addEventListener("click", () =>
      this._handleLikeButton(this._id)
    );
    this._deleteBtn.addEventListener("click", () =>
      this._handleDeleteButton(this._id)
    );
  }

  /**
   * this method checks if the card is liked by the user
   * @returns whether the card is liked by the user or not
   */
  isLiked() {
    return this._likes.some((user) => user._id === this._userId);
  }

  /**
   * this method present the number of likes of a card and handle the like button
   */
  likeCard(likes) {
    this._likes = likes;
    this._showLikes.textContent = this._likes.length;
    this._likeBtn.classList.toggle("element__like-btn_active");
  }

  /**
   * function that handle the delete button once it pressed
   */
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  /**
   * this method create a new card to the webpage populated with data
   * @returns a new card
   */
  generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._text.textContent = this._name;
    this._showLikes = this._element.querySelector(".element__show-likes");
    this._showLikes.textContent = this._likes.length;
    this._setEventListeners();

    if (this._ownerId !== this._userId) {
      this._deleteBtn.style.display = "none";
    }

    if (this.isLiked()) {
      this.likeCard(this._likes);
    }
    return this._element;
  }
}

export default Card;
