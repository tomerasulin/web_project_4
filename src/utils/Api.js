/**
 * This class responsible to communicate with the server
 */
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  init() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  /**
   * this method fetch the user info from the server
   * {
        "name": "Jacques Cousteau",
        "about": "Sailor, researcher",
        "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
        "_id": "e20537ed11237f86bbb20ccb",
        "cohort": "group-42"
      }
   * @returns user information from the server
   */
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  /**
   * this method fetch the initial cards from the server
   * [
      {
        "likes": [],
        "_id": "5d1f0611d321eb4bdcd707dd",
        "name": "Yosemite Valley",
        "link": "https://code.s3.yandex.net/web-code/yosemite.jpg",
        "owner": {
          "name": "Jacques Cousteau",
          "about": "Sailor, researcher",
          "avatar": "https://code.s3.yandex.net/web-code/avatar.jpg",
          "_id": "ef5f7423f7f5e22bef4ad607",
          "cohort": "group-42"
        },
        "createdAt": "2019-07-05T08:10:57.741Z"
      }
    ]
   * @returns the initial cards from the server
   */
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  /**
   * this method takes data from the user and modify the existing information on the server
   * @param {*} data
   * @returns a modified profile data in the body of the server response
   */
  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  /**
   * this method send a POST request to add a new card to the server
   * @param {*} data
   * @returns a response with the object of the new card from the server
   */
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  /**
   * this method take a card id and delete it from the server
   * @param {*} id
   * @returns
   */
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._getResponseData(res));
  }

  /**
   * this method send a PUT request to like a card
   * @param {*} id
   * @returns
   */
  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      headers: this._headers,
      method: "PUT",
    }).then((res) => this._getResponseData(res));
  }

  /**
   * this method send a DELETE request to remove a like from a card
   * @param {*} id
   * @returns
   */
  dislikeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._getResponseData(res));
  }

  /**
   * this method send a PATCH request to chagne the profile picture
   * @param {*} avatar
   * @returns
   */
  updateProfilePic(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: avatar["image-link"] }),
    }).then((res) => this._getResponseData(res));
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }
}
