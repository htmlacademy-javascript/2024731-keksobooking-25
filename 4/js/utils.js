function getRandomInteger(min, max) {

  return (min < max) ? Math.round(Math.random() * (max - min) + min) : -1;
}

function getRandomFloat(min, max, decimalPlace) {
  if (min < max) {
    const randomNumber = Math.random() * (max - min) + min;
    const precision = 10 ** decimalPlace;

    return Math.round(randomNumber * precision) / precision;
  }

  return -1;
}

// перемешивание элементов в массиве
function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  return arr;
}

function translateHouseType(obj,count) {
  switch(obj[count].offer.type) {
    case 'palace':

      return 'Дворец';
    case 'flat':

      return 'Квартира';
    case 'house':

      return 'Дом';
    case 'bungalow':

      return 'Бунгало';
    case 'hotel':

      return 'Отель';
  }
}

export {getRandomInteger, getRandomFloat, shuffle, translateHouseType};
