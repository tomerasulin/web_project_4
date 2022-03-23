/**
 * This class is responsible for rendering information about the user on the page
 */
export default class UserInfo {
  constructor({ userName, userJob, avatar }) {
    this._userName = userName;
    this._userJob = userJob;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar["image-link"];
  }
}
