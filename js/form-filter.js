import {TranslateHouseType, makePluralOfRooms, makePluralOfGuests} from './utils.js';

const templatePopup = document.querySelector('#card');
const clonePopupForm = templatePopup.content.cloneNode(true);

function insertFeaturesForPopup(element, advertData) {
  const popupFeaturesContainer = element.querySelector('.popup__features');
  const popupFeaturesList = popupFeaturesContainer.querySelectorAll('.popup__feature');

  if (advertData.offer.features !== undefined) {
    popupFeaturesList.forEach((popupFeaturesListItem) => {
      const isExist = advertData.offer.features.some(
        (objFeature) => popupFeaturesListItem.classList.contains(`popup__feature--${objFeature}`),
      );
      if (!isExist) {
        popupFeaturesListItem.remove();
      }
    });
  }
  else {
    popupFeaturesList.forEach((popupFeaturesListItem) => {
      popupFeaturesListItem.remove();
    });
  }
}

function insertPopupPhotos(element, advertData) {
  let startPosition = element.querySelector('.popup__photos');
  let nextImage = element.querySelector('.popup__photo');

  for(let i = 0; i <= advertData.offer.photos.length-1; i++) {
    nextImage.src = advertData.offer.photos[i];
    startPosition.after(nextImage);
    startPosition = nextImage;
    nextImage = element.querySelector('.popup__photo').cloneNode(true);
  }
}

function insertDescription(element, advertData) {
  const descriptionContainer = element.querySelector('.popup__description');

  if ((advertData.offer.description).length > 0) {
    descriptionContainer.textContent = advertData.offer.description;
  }
  else {
    descriptionContainer.remove();
  }
}

function putDataToPopup (advertData) {
  insertFeaturesForPopup(clonePopupForm, advertData);
  insertPopupPhotos(clonePopupForm, advertData);
  insertDescription(clonePopupForm, advertData);

  clonePopupForm.querySelector('.popup__title').textContent = advertData.offer.title;
  clonePopupForm.querySelector('.popup__text--price').innerHTML = `${advertData.offer.price} <span>₽/ночь</span>`;
  clonePopupForm.querySelector('.popup__avatar').src = advertData.author.avatar;
  clonePopupForm.querySelector('.popup__text--address').textContent = `${advertData.offer.address}`;
  clonePopupForm.querySelector('.popup__text--time').textContent = `Заезд после ${advertData.offer.checkin}, выезд до ${advertData.offer.checkout}`;
  clonePopupForm.querySelector('.popup__type').textContent = TranslateHouseType[advertData.offer.type];
  clonePopupForm.querySelector('.popup__text--capacity')
    .textContent = `${advertData.offer.rooms} ${makePluralOfRooms(advertData.offer.rooms)} для ${advertData.offer.guests} ${makePluralOfGuests(advertData.offer.guests)}`;
}

export {putDataToPopup, clonePopupForm};

