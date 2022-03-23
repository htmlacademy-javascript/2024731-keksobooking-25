import {TranslateHouseType, makePluralOfRooms, makePluralOfGuests} from './utils.js';
import {disableSlider, enableSlider} from './slider.js';

const templatePopup = document.querySelector('#card').content.querySelector('.popup');
let clonePopupForm = templatePopup.cloneNode(true);
const inputForm = document.querySelector('.ad-form');
const inputFormFields = inputForm.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters-container');
const mapFilterSelects = mapFilter.querySelectorAll('.map__filter');

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
  clonePopupForm = templatePopup.cloneNode(true);
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

  return clonePopupForm;
}

function disabledFiltersInputs() {
  inputFormFields.forEach((inputFormField) => {
    inputFormField.classList.add('ad-form--disabled');
  });
  mapFilter.classList.add('map__filters--disabled');
  mapFilterSelects.forEach((mapFilterSelect) => {
    mapFilterSelect.setAttribute('disabled', true);
  });
  disableSlider();
}

function enabledFiltersInputs() {
  inputFormFields.forEach((inputFormField) => {
    inputFormField.classList.remove('ad-form--disabled');
  });
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterSelects.forEach((mapFilterSelect) => {
    mapFilterSelect.removeAttribute('disabled');
  });
  enableSlider();
}

const placeCoordinatesToForm = (coord) => {
  const addressInput = document.getElementById ('address');
  addressInput.setAttribute('placeholder', `${coord['lat'].toFixed(5)}, ${coord['lng'].toFixed(5)}`);
};

export {putDataToPopup, disabledFiltersInputs, enabledFiltersInputs, placeCoordinatesToForm, clonePopupForm};

