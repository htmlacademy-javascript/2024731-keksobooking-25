import {makePluralOfRooms, makePluralOfGuests} from './utils.js';
import {disableSubmitBtn, enableSubmitBtn} from './forms.js';
import {sendData} from './api.js';
import {setDefaultStateMap, resetCurrentStateMap, removeMarker} from './map.js';
import {setDefaultStateSlider} from './slider.js';
import {resetFilter} from './filter.js';
import {resetPhotoFormsToDefault} from './load-photo.js';

const typeOptions = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000
};

const roomOptions = {
  '1': 1,
  '2': 2,
  '3': 3,
  '100': 0
};

const MIN_SYMBOLS_COUNT = 30;
const MAX_SYMBOLS_COUNT = 100;
const MAX_PRICE = 100000;

const advertForm = document.querySelector('.ad-form');
const priceField = advertForm.querySelector('#price');
const titleField = advertForm.querySelector('#title');
const timeinField = advertForm.querySelector('#timein');
const timeoutField = advertForm.querySelector('#timeout');
const typeField = advertForm.querySelector('[name="type"]');
const roomsField = advertForm.querySelector('[name="rooms"]');
const capacityField = advertForm.querySelector('[name="capacity"]');
const errorMsgTitle = 'Заголовок должен быть от 30 до 100 символов';
const mainForm = document.querySelector('.ad-form');
const resetBtn = document.querySelector('.ad-form__reset');

const pristine = new Pristine(advertForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__error-text'
});

function makeErrorMsgPrice() {
  return `Цена от ${typeOptions[typeField.value]} руб.`;
}

function makeErrorMsgRooms() {
  const numberOfRoom = Number(roomsField.value);
  const capacityRoom = Number(capacityField.value);

  if (!(roomOptions[roomsField.value]) || !(capacityRoom)) {

    return '100 комнат не для гостей';
  }

  return `${roomsField.value} ${makePluralOfRooms(numberOfRoom)}\
      для не более ${roomOptions[roomsField.value]} ${makePluralOfGuests(roomOptions[roomsField.value])}`;
}

function makeValidator(elementField, validateFunction, errorMessage) {
  pristine.addValidator(elementField, validateFunction, errorMessage);
}

function validateTitle(value) {

  return value.length >= MIN_SYMBOLS_COUNT && value.length <= MAX_SYMBOLS_COUNT;
}

function validatePrice(value) {

  return value >= typeOptions[typeField.value] && value <= MAX_PRICE;
}

function removeErrorMsg(classElement) {
  const elementErrorMsg = advertForm.querySelector(classElement);
  if (elementErrorMsg.querySelector('.ad-form__error-text')) {
    elementErrorMsg.querySelector('.ad-form__error-text').style.display = 'none';
  }
}

function validateCapacity() {
  const capacityRoom = Number(capacityField.value);

  if (!(capacityRoom) && (roomOptions[roomsField.value] === roomOptions['100'])) {

    return true;
  }
  else if ((roomOptions[roomsField.value] >= capacityRoom) && (capacityRoom > roomOptions['100'])) {

    return true;
  }
  return false;
}

function syncTimeSelect(selectorFirst, selectorSecond) {
  const currentTimein = Number(timeinField.value.slice(0,2));
  const currentTimeout = Number(timeoutField.value.slice(0,2));

  if (currentTimein < currentTimeout) {
    selectorFirst.value = selectorSecond.value;
  }
}

makeValidator(titleField, validateTitle, errorMsgTitle);
makeValidator(priceField, validatePrice, makeErrorMsgPrice);
makeValidator(roomsField, validateCapacity, makeErrorMsgRooms);
makeValidator(capacityField, validateCapacity, makeErrorMsgRooms);

roomsField.addEventListener('change', () => {
  removeErrorMsg('.ad-form__capacity');
});

capacityField.addEventListener('change', () => {
  removeErrorMsg('.ad-form__rooms');
});

timeinField.addEventListener('change', () => syncTimeSelect(timeoutField, timeinField));

timeoutField.addEventListener('change', () => syncTimeSelect(timeinField, timeoutField));

typeField.addEventListener('change', () => {
  priceField.placeholder=`${typeOptions[typeField.value]}`;
});

function resetToDefault() {
  mainForm.reset();
  removeMarker();
  resetCurrentStateMap();
  setDefaultStateSlider();
  disableSubmitBtn();
  setDefaultStateMap();
  resetFilter();
  resetPhotoFormsToDefault();
}

function setUserFormSubmit(onSuccess, onError) {
  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      sendData(formData, onSuccess, onError);
      resetToDefault();
    }
  });
}

resetBtn.addEventListener('click', () => {
  resetToDefault();
  enableSubmitBtn();
});

export {priceField, setUserFormSubmit};
