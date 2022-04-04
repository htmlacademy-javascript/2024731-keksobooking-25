import {TranslateHouseType, makePluralOfRooms, makePluralOfGuests} from './utils.js';
import {disableSlider, enableSlider} from './slider.js';

const NUM_DIGIT = 5;
const templatePopup = document.querySelector('#card').content.querySelector('.popup');
let clonePopupForm = templatePopup.cloneNode(true);
const inputForm = document.querySelector('.ad-form');
const inputFormFields = inputForm.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const mapFilterSelects = mapFilter.querySelectorAll('.map__filter');
const submitBtn = document.querySelector('.ad-form__submit');

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
    for(let i = 0; i <= advertData.offer.photos.length - 1; i++) {
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

  if (advertData.offer.description !== undefined) {
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

function disableMapFilter() {
  mapFilter.classList.add('map__filters--disabled');
  mapFilterSelects.forEach((mapFilterSelect) => {
    mapFilterSelect.setAttribute('disabled', true);
    mapFilterSelect.classList.add('ad-form--disabled');
  });
}

function enableMapFilter() {
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterSelects.forEach((mapFilterSelect) => {
    mapFilterSelect.removeAttribute('disabled');
    mapFilterSelect.classList.remove('ad-form--disabled');
  });
}

function disabledFiltersInputs() {
  inputFormFields.forEach((inputFormField) => {
    inputFormField.classList.add('ad-form--disabled');
  });
  disableMapFilter();
  disableSlider();
}

function enabledFiltersInputs() {
  inputFormFields.forEach((inputFormField) => {
    inputFormField.classList.remove('ad-form--disabled');
  });
  enableMapFilter();
  enableSlider();
}

function placeCoordinatesToForm(coord) {
  const addressInput = document.getElementById ('address');
  addressInput.value = `${coord['lat'].toFixed(NUM_DIGIT)}, ${coord['lng'].toFixed(NUM_DIGIT)}`;
}

function disableSubmitBtn() {
  submitBtn.classList.add('ad-form__submit--disabled');
  submitBtn.setAttribute('disabled', true);
}

function enableSubmitBtn() {
  submitBtn.classList.remove('ad-form__submit--disabled');
  submitBtn.removeAttribute('disabled');
}

export {putDataToPopup, disabledFiltersInputs, disableMapFilter, enableMapFilter, enabledFiltersInputs, placeCoordinatesToForm, disableSubmitBtn, enableSubmitBtn, clonePopupForm};

