import {TranslateHouseType, makePluralOfRooms, makePluralOfGuests} from './utils.js';

const templatePopup = document.querySelector('#card');
const clonePopupForm = templatePopup.content.cloneNode(true);

const insertDataToField = (classField) => clonePopupForm.querySelector(classField);

function insertPopupFeatures(advertData) {
  const popupFeaturesContainer = insertDataToField('.popup__features');
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

function insertPopupPhotos(advertData) {
  let startPosition = insertDataToField('.popup__photos');
  let nextImage = insertDataToField('.popup__photo');
  if (advertData.offer.photos !== undefined) {
    for(let i = 0; i <= advertData.offer.photos.length-1; i++) {
      nextImage.src = advertData.offer.photos[i];
      startPosition.after(nextImage);
      startPosition = nextImage;
      nextImage = insertDataToField('.popup__photo').cloneNode(true);
    }
  }
  else {
    startPosition.remove();
  }
}

function insertPopupDescription(advertData) {
  const descriptionContainer = insertDataToField('.popup__description');

  if ((advertData.offer.description).length > 0) {
    descriptionContainer.textContent = advertData.offer.description;
  }
  else {
    descriptionContainer.remove();
  }
}

function insertPopupAvatar(advertData) {
  if (advertData.offer.photos !== undefined) {
    insertDataToField('.popup__avatar').src = advertData.author.avatar;
  }
  else {
    insertDataToField('.popup__avatar').remove();
  }
}

function putDataToPopup (advertData) {
  const offerForPopup = advertData.offer.title;
  const priceForPopup = `${advertData.offer.price} <span>₽/ночь</span>`;
  const addressForPopup = `${advertData.offer.address}`;
  const timeForPopup = `Заезд после ${advertData.offer.checkin}, выезд до ${advertData.offer.checkout}`;
  const capacityForPopup = `${advertData.offer.rooms} ${makePluralOfRooms(advertData.offer.rooms)} \
    для ${advertData.offer.guests} ${makePluralOfGuests(advertData.offer.guests)}`;

  insertPopupFeatures(advertData);
  insertPopupPhotos(advertData);
  insertPopupDescription(advertData);
  insertPopupAvatar(advertData);
  insertDataToField('.popup__title').textContent = offerForPopup;
  insertDataToField('.popup__text--price').innerHTML = priceForPopup;
  insertDataToField('.popup__text--address').textContent = addressForPopup;
  insertDataToField('.popup__text--time').textContent = timeForPopup;
  insertDataToField('.popup__type').textContent = TranslateHouseType[advertData.offer.type];
  insertDataToField('.popup__text--capacity').textContent = capacityForPopup;
}

export {putDataToPopup, clonePopupForm};

