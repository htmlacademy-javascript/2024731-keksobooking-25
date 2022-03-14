const translateHouseType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

function getRandomFloat(min, max, decimalPlace) {
  if (min < max) {
    const randomNumber = Math.random() * (max - min) + min;
    const precision = 10 ** decimalPlace;

    return Math.round(randomNumber * precision) / precision;
  }

  return -1;
}

function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  return arr;
}

function makePluralOfRooms(obj) {
  if (((obj === 1) || (obj % 10 === 1)) && (obj !== 11)) {

    return 'комната';
  }
  else if ((obj >= 2) && (obj <= 4)) {

    return 'комнаты';
  }
  else {

    return 'комнат';
  }
}

const getRandomInteger = (min, max) => (min < max) ? Math.round(Math.random() * (max - min) + min) : -1;

const makePluralOfGuests = (obj) => (obj !== 1) ? 'гостей' : 'гостя';

export {getRandomInteger, getRandomFloat, shuffle, translateHouseType, makePluralOfRooms, makePluralOfGuests};
