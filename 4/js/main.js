// нужно будет в выводе всплывающего окна, пока не используется
// import {translateHouseType} from './utils.js';
import {getData, urlData} from './get-data.js';
import {addTiles, makeMap, placeMarkerToMap, advertIcon, basicIcon} from './map.js';
import {placeCoordinatesToForm, disabledFiltersInputs, enabledFiltersInputs} from './form-filter.js';

let arrayOfAdverts = [];
let arrayForFilteredAdvert = [];
const maxCountRecords = 10;
const defaultCoord = {
  lat: 35.6895,
  lng: 139.692
};
const defaultZoom = 13;
const dragabble = true;
let basicMarker = L.marker(defaultCoord, {'draggable': false, icon: basicIcon});
// нужны будут в фильтрах, пока не используются
// let filterTypes = false;
// let filterPrices = false;
// let filterRooms = false;
// let filterGuests = false;

disabledFiltersInputs();
getData(urlData).then((data) => {arrayOfAdverts = data;});
const map = makeMap('map-canvas', defaultCoord, defaultZoom);
const tile = addTiles(map);

tile.addEventListener('load', () => {
  basicMarker = placeMarkerToMap(defaultCoord, basicIcon, map, dragabble);
  enabledFiltersInputs();
  setTimeout(() => {
    for(let i = 0; i < maxCountRecords; i++) {
      placeMarkerToMap(arrayOfAdverts[i].location, advertIcon, map);
    }
  }, 1500);
  tile.removeEventListener();
});

map.addEventListener('click',(evt) => {
  basicMarker.removeFrom(map);
  basicMarker = placeMarkerToMap([evt.latlng['lat'], evt.latlng['lng']], basicIcon, map, dragabble);
  placeCoordinatesToForm(basicMarker);
  basicMarker.addEventListener('dragend', () => {
    placeCoordinatesToForm(basicMarker);
  });
});

const houseTypeFilter = document.getElementById('housing-type');
houseTypeFilter.addEventListener('change', (evt) => {
  const houseType = evt.target.value;
  const markers = document.querySelectorAll('.myicon');
  if (!(houseType === 'any')) {
    arrayForFilteredAdvert = arrayOfAdverts.filter((Advert) => Advert.offer.type === houseType);
    for (let i = 0; i < markers.length; i++) {
      markers[i].remove();
    }
  }
  else {
    arrayForFilteredAdvert = arrayOfAdverts;
  }
  const maxCountForViewFilters = (maxCountRecords <= arrayForFilteredAdvert.length) ? maxCountRecords : arrayForFilteredAdvert.length;
  for(let i = 0; i < maxCountForViewFilters; i++) {
    placeMarkerToMap(arrayForFilteredAdvert[i].location, advertIcon, map);
  }
});

const priceFilter = document.getElementById('housing-price');
priceFilter.addEventListener('change', (evt) => {
  const currentPrice = evt.target.value;
  const markers = document.querySelectorAll('.myicon');
  for (let i = 0; i < markers.length; i++) {
    markers[i].remove();
  }
  if (currentPrice === 'middle') {
    arrayForFilteredAdvert = arrayOfAdverts.filter((Advert) => (Advert.offer.price >= 10000 && Advert.offer.price <= 50000));
  }
  else if (currentPrice === 'low') {
    arrayForFilteredAdvert = arrayOfAdverts.filter((Advert) => (Advert.offer.price <= 10000));
  }
  else if (currentPrice === 'high') {
    arrayForFilteredAdvert = arrayOfAdverts.filter((Advert) => (Advert.offer.price >= 50000));
  }
  else {
    arrayForFilteredAdvert = arrayOfAdverts;

  }
  const maxCountForViewFilters = (maxCountRecords <= arrayForFilteredAdvert.length) ? maxCountRecords : arrayForFilteredAdvert.length;
  for(let i = 0; i < maxCountForViewFilters; i++) {
    placeMarkerToMap(arrayForFilteredAdvert[i].location, advertIcon, map);
  }
});
