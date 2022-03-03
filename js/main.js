import {getRandomInteger, getRandomFloat, shuffle} from './random-functons.js';

const lenghtAarrayPhotosId = 10;
const minTimeInterval = 0;
const minBorderOfFeaturesArray = 0;
const minBorderOfHouseTypesArray = 0;
const arrayPhotosId = shuffle(Array.from({ length: lenghtAarrayPhotosId }, (index, value) => value + 1));
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

const makeRandCoordinates = (coordMin, coordMax, precision) => getRandomFloat(coordMin, coordMax, precision);

const checkInOutTimes = (timeInterval) => timeInterval[getRandomInteger(minTimeInterval, timeInterval.length-1)];

const makeRandomNumbersFileds = (min, max) => getRandomInteger(min, max);

const chooseHouseType = (houseType) => houseType[getRandomInteger(minBorderOfHouseTypesArray, houseType.length-1)];

const chooseRandomOfItems = (featuresType) => featuresType.slice(getRandomInteger(1, featuresType.length-1));

const makeAddress = (offerdId) => `${arrayOfAdverts[offerdId].location.lat}, ${arrayOfAdverts[offerdId].location.lng}`;

const makePhotosLink = (autorID) => `img/avatars/user${arrayPhotosId[autorID].toString().padStart(2,0)}.png`;

const chooseTitle = (featuresType) => `${featuresType[getRandomInteger(minBorderOfFeaturesArray, featuresType.length-1)]}`;

const chooseDescription = (featuresType) => `${featuresType[getRandomInteger(minBorderOfFeaturesArray, featuresType.length-3)]}.
  ${featuresType[getRandomInteger(2, featuresType.length-1)]}`;

function makeKeysAdverts(...keysFields) {
  for (let i = 0; i < 10; i++) {
    arrayOfAdverts[i] = {};
  }
  keysFields.forEach((keysField) => {
    for (let i = 0; i < 10; i++) {
      arrayOfAdverts[i][keysField] = {};
      if (keysField === 'offer') {
        const minNumberGuests = 1;
        const maxNumberGuests = 10;
        const minNumberRooms = 1;
        const maxNumberRooms = 20;
        const minPrice = 1000;
        const maxPrice = 10000;
        arrayOfAdverts[i].offer['checkin'] = checkInOutTimes(arrayTimeCheckInOut);
        arrayOfAdverts[i].offer['checkout'] = checkInOutTimes(arrayTimeCheckInOut);
        arrayOfAdverts[i].offer['guests'] = makeRandomNumbersFileds(minNumberGuests, maxNumberGuests);
        arrayOfAdverts[i].offer['rooms'] = makeRandomNumbersFileds(minNumberRooms, maxNumberRooms);
        arrayOfAdverts[i].offer['price'] = makeRandomNumbersFileds(minPrice, maxPrice);
        arrayOfAdverts[i].offer['type'] = chooseHouseType(houseTypes);
        arrayOfAdverts[i].offer['features'] = chooseRandomOfItems(features);
        arrayOfAdverts[i].offer['photos'] = chooseRandomOfItems(arrayPhotos);
        arrayOfAdverts[i].offer['address'] = makeAddress(i);
        arrayOfAdverts[i].offer['title'] = chooseTitle(i, arrayTitles);
        arrayOfAdverts[i].offer['description'] = chooseDescription(arrayDescriptions);
      }
      if (keysField === 'location') {
        const precisionOfCoordinates = 5;
        const latMin = 35.65000;
        const latMax = 35.70000;
        const lngMin = 139.70000;
        const lngMax = 139.80000;

        arrayOfAdverts[i].location['lat'] = makeRandCoordinates(latMin, latMax, precisionOfCoordinates);
        arrayOfAdverts[i].location['lng'] = makeRandCoordinates(lngMin, lngMax, precisionOfCoordinates);
      }
      if (keysField === 'autor') {
        arrayOfAdverts[i]['autor'] = {};
        arrayOfAdverts[i].autor['avatar'] =  makePhotosLink(i);
      }
    }
  });
}
