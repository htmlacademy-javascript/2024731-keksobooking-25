const TranslateHouseType = {
  palace:   'Дворец',
  flat:     'Квартира',
  house:    'Дом',
  bungalow: 'Бунгало',
  hotel:    'Отель'
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

function makePluralOfRooms(rooms) {
  if (((rooms === 1) || (rooms % 10 === 1)) && (rooms !== 11)) {

    return 'комната';
  }
  else if ((rooms >= 2) && (rooms <= 4)) {

    return 'комнаты';
  }
  else {

    return 'комнат';
  }
}

const getRandomInteger = (min, max) => (min < max) ? Math.round(Math.random() * (max - min) + min) : -1;

const makePluralOfGuests = (guests) => (guests !== 1) ? 'гостей' : 'гостя';

export {getRandomInteger, getRandomFloat, shuffle, TranslateHouseType, makePluralOfRooms, makePluralOfGuests};
