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

getRandomInteger(2, 20);
getRandomFloat(1, 20, 3);

