export function getRandomInteger(min, max) {

  return (min < max) ? Math.round(Math.random() * (max - min) + min) : -1;
}

export function getRandomFloat(min, max, decimalPlace) {
  if (min < max) {
    const randomNumber = Math.random() * (max - min) + min;
    const precision = 10 ** decimalPlace;

    return Math.round(randomNumber * precision) / precision;
  }

  return -1;
}

// перемешивание элементов в массиве
export function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  return arr;
}
