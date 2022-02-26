import Popup from './Popup.js';

/**
 * This class is a child class of Popup class
 * this class has to change the parent open() method of the Popup class
 */
export default class PopupWithImage extends Popup{
    open({link, name}){
        const caption = this._popupSelector.querySelector('.popup-box__text');
        const img = this._popupSelector.querySelector('.popup-box__image');

        caption.textContent = name;
        img.src = link;
        img.alt = name;
        super.open();// call the parent open() method
    }
}