import {getRandomInteger, getRandomFloat, shuffle} from './random-functons.js';

const arrayPhotosId = shuffle(Array.from({ length: 10 }, (v, k) => k + 1));
const arrayOfAdverts = [];
const arrayTimeCheckInOut = ['12:00', '13:00', '14:00'];
const houseTypes = ['palace', 'flat', 'house', 'bungalow','hotel'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const arrayPhotos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const arrayTitles = [
  'Лучшее жилье в городе',
  'Дом в окружении парков',
  'Превосходное и недорогое жилье',
  'Дорогие аппартаменты для притязательных клиентов',
  'Дешевле комнаты не найдешь'
];

const arrayDescriptions = [
  'Чистое и ухоженное жилье, с доплнительным обслуживание',
  'В пешей доступности места отдыха, рестораны и парки',
  'Тихий район, подходящий для спокойного отдыха',
  'Отсутствие посторонних',
  'Бассейн, сауна, место для проведения вечеринок'
];

const coordinates = (coordId, coordType, coordMin, coordMax, precision) => {
  arrayOfAdverts[coordId].location[coordType] = getRandomFloat(coordMin, coordMax, precision);
};

const checkInOutTimes = (offerdId, checkInOut, timeInterval) => {
  arrayOfAdverts[offerdId].offer[checkInOut] = timeInterval[getRandomInteger(0, timeInterval.length-1)];
};

const makeRandomNumbersFileds = (offerdId, keysType, min, max) => {
  arrayOfAdverts[offerdId].offer[keysType] = getRandomInteger(min, max);
};

const chooseHouseType = (offerdId, houseType, keysType = 'type') => {
  arrayOfAdverts[offerdId].offer[keysType] = houseType[getRandomInteger(0, houseType.length-1)];
};

const chooseRandomOfItems = (offerdId, keysType, featuresType) => {
  arrayOfAdverts[offerdId].offer[keysType] = featuresType.slice(getRandomInteger(1, featuresType.length-1));
};

const makeAddress = (offerdId, keysType = 'address') => {
  arrayOfAdverts[offerdId].offer[keysType] = `${arrayOfAdverts[offerdId].location.lat}, ${arrayOfAdverts[offerdId].location.lng}`;
};

const makePhotosLink = (autorID) => {
  arrayOfAdverts[autorID]['autor'] = {};
  arrayOfAdverts[autorID].autor['avatar'] = `img/avatars/user${arrayPhotosId[autorID].toString().padStart(2,0)}.png`;
};

const chooseTitle = (offerdId, featuresType, keysType = 'title') => {
  arrayOfAdverts[offerdId].offer[keysType] = `${featuresType[getRandomInteger(0, featuresType.length-1)]}`;
};

const chooseDescription = (offerdId, featuresType, keysType = 'description') => {
  arrayOfAdverts[offerdId].offer[keysType] = `${featuresType[getRandomInteger(0, featuresType.length-3)]}.
  ${featuresType[getRandomInteger(2, featuresType.length-1)]}`;
};

function makeKeysAdverts(...keysFields) {
  for (let i = 0; i < 10; i++) {
    arrayOfAdverts[i] = {};
  }
  keysFields.forEach((keysField) => {
    for (let i = 0; i < 10; i++) {
      arrayOfAdverts[i][keysField] = {};
      if (keysField === 'offer') {
        checkInOutTimes(i, 'checkin', arrayTimeCheckInOut);
        checkInOutTimes(i, 'checkout', arrayTimeCheckInOut);
        makeRandomNumbersFileds(i, 'guests', 1, 10);
        makeRandomNumbersFileds(i, 'rooms', 1, 20);
        makeRandomNumbersFileds(i, 'price', 1000, 10000);
        chooseHouseType(i, houseTypes);
        chooseRandomOfItems(i, 'features', features);
        chooseRandomOfItems(i, 'photos', arrayPhotos);
        makeAddress(i);
        chooseTitle(i, arrayTitles);
        chooseDescription(i, arrayDescriptions);
      }
      if (keysField === 'location') {
        coordinates(i, 'lat', 35.65000, 35.70000, 5);
        coordinates(i, 'lng', 139.70000, 139.80000, 5);
      }
      if (keysField === 'autor') {
        makePhotosLink(i);
      }
    }
  });
}

makeKeysAdverts('location', 'autor', 'offer');
