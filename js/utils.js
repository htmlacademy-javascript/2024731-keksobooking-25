const ONE_ROOM = 1;
const TENS_AND_ONE_ROOMS = 11;
const GENITIVE_CASE_MIN = 2;
const GENITIVE_CASE_MAX = 4;

const translateHouseType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

function makePluralOfRooms(rooms) {
  if (((rooms === ONE_ROOM) || (rooms % 10 === ONE_ROOM)) && (rooms !== TENS_AND_ONE_ROOMS)) {

    return 'комната';
  }
  else if ((rooms >= GENITIVE_CASE_MIN) && (rooms <= GENITIVE_CASE_MAX)) {

    return 'комнаты';
  }
  else {

    return 'комнат';
  }
}

const makePluralOfGuests = (guests) => (guests !== 1) ? 'гостей' : 'гостя';

const debounce = (fn, wait) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, arguments), wait);
  };
};

export {translateHouseType, makePluralOfRooms, makePluralOfGuests, debounce};
