import {translateHouseType, makePluralOfRooms, makePluralOfGuests} from './utils.js';

const templatePopup = document.querySelector('#card');
const clonePopupForm = templatePopup.content.cloneNode(true);

function selectFeaturesForPopup(element, obj) {
  const popupFeaturesContainer = element.querySelector('.popup__features');
  const popupFeaturesList = popupFeaturesContainer.querySelectorAll('.popup__feature');
  if (obj.offer.features !== undefined) {
    popupFeaturesList.forEach((popupFeaturesListItem) => {
      const isExist = obj.offer.features.some(
        (objFeature) => popupFeaturesListItem.classList.contains(`popup__feature--${objFeature}`),
      );
      if (!isExist) {
        popupFeaturesListItem.remove();
      }
    });
  } else {
    popupFeaturesList.forEach((popupFeaturesListItem) => {
      popupFeaturesListItem.remove();
    });
  }
}

function insertPopupPhotos(element, obj) {
  let startPosition = element.querySelector('.popup__photos');
  let nextImage = element.querySelector('.popup__photo');
  for(let i = 0; i <= obj.offer.photos.length-1; i++) {
    nextImage.src = obj.offer.photos[i];
    startPosition.after(nextImage);
    startPosition = nextImage;
    nextImage = element.querySelector('.popup__photo').cloneNode(true);
  }
}

function putDataToPopup (obj) {
  clonePopupForm.querySelector('.popup__title').textContent = obj.offer.title;
  clonePopupForm.querySelector('.popup__text--price').innerHTML = `${obj.offer.price} <span>₽/ночь</span>`;
  clonePopupForm.querySelector('.popup__avatar').src = obj.author.avatar;
  clonePopupForm.querySelector('.popup__text--capacity')
    .textContent = `${obj.offer.rooms} ${makePluralOfRooms(obj.offer.rooms)} для ${obj.offer.guests} ${makePluralOfGuests(obj.offer.guests)}`;
  clonePopupForm.querySelector('.popup__text--time').textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
  clonePopupForm.querySelector('.popup__description').textContent = obj.offer.description;
  clonePopupForm.querySelector('.popup__type').textContent = translateHouseType[obj.offer.type];
  selectFeaturesForPopup(clonePopupForm, obj);
  insertPopupPhotos(clonePopupForm, obj);
}

export {putDataToPopup, clonePopupForm};

