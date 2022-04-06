import {debounce} from './utils.js';
import {createPin} from './map.js';

const FILTER_DEFAULT_TYPE = 'any';
const FILTER_DELAY = 500;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const mapFilter = document.querySelector('.map__filters-container');
const formFilters = mapFilter.querySelector('.map__filters');

const defaultCheck = (element) => element === FILTER_DEFAULT_TYPE;

function filterType(advertItems, element) {
  if (!defaultCheck(element[0])) {
    return advertItems.offer.type === element[0];
  }
  return true;
}

function filterPrice(advertItems, element) {
  if (defaultCheck(element[0])) {
    return true;
  }
  if (element[0] === 'low') {
    return advertItems.offer.price < LOW_PRICE;
  }
  if (element[0] === 'middle') {
    return advertItems.offer.price >= LOW_PRICE && advertItems.offer.price < HIGH_PRICE;
  }
  if (element[0] === 'high') {
    return advertItems.offer.price >= HIGH_PRICE;
  }
  return false;
}

function filterFeatures(advertItem, value) {
  if (value.length) {
    for (const feature of value) {
      if (advertItem.offer.features && (advertItem.offer.features.includes(feature))) {
        continue;
      }
      return false;
    }
  }
  return true;
}

function filterRooms(advertItems, element) {
  if (!defaultCheck(element[0])) {
    return Number(element[0]) === advertItems.offer.rooms;
  }
  return true;
}

function filterGuests(advertItems, element) {
  if (!defaultCheck(element[0])) {
    return Number(element[0]) === advertItems.offer.guests;
  }
  return true;
}

const Filter = {
  'housing-type': (similarAdvert, value) => filterType(similarAdvert, value),
  'housing-price': (similarAdvert, value) => filterPrice(similarAdvert, value),
  'housing-rooms': (similarAdvert, value) => filterRooms(similarAdvert, value),
  'housing-guests': (similarAdvert, value) => filterGuests(similarAdvert, value),
  'features': (similarAdvert, value) => filterFeatures(similarAdvert, value),
};

const allFilters = (similarAdverts) => {
  const formData = new FormData(formFilters);
  Object.keys(Filter).forEach((key) => {
    similarAdverts = similarAdverts.filter((similarAdvert) => Filter[key](similarAdvert, formData.getAll(key)));
  });
  return similarAdverts;
};

const onFilterChange = (similarAdverts) =>
  debounce(() => {
    const filteredAdds = allFilters(similarAdverts);
    createPin(filteredAdds);
  }, FILTER_DELAY);

const setFilter = (similarAdverts) =>
  mapFilter.addEventListener('change', onFilterChange(similarAdverts));

const resetFilter = () => formFilters.reset();

export {setFilter, resetFilter};

