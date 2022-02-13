/**
 * function that receives a popup box and make it visible to the user
 * @param {*} popup
 */
export const openPopup = (popup) => {
  popup.classList.add("popup-box_opened");
  document.addEventListener("keydown", keyHandler);
};

/**
 * function that recevies a popup box and make it invisible to the user
 * @param {*} popup
 */
export const closePopup = (popup) => {
  popup.classList.remove("popup-box_opened");
  document.removeEventListener("keydown", keyHandler);
};

/**
 * this function gets the event object and once there is a keydown event it checks
 * whether the key is an escape key, in case it is the popup window will be close
 * @param {} evt
 */
const keyHandler = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup-box_opened");
    closePopup(popup);
  }
};
