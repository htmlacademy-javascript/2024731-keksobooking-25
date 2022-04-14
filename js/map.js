import {enabledFiltersInputs, putDataToPopup} from './forms.js';
import {showErrorServerWindow} from './infor-windows.js';
import {getData} from './api.js';
import {setFilter} from './filter.js';

const COUNT_ADVERTS = 10;
const MAIN_ICON_IMG = './img/main-pin.svg';
const SMALL_ICON_IMG = './img/pin.svg';
const MAIN_ICONS_SIZES = [52, 52];
const MAIN_ICONS_ANCHOR_COORDINATES = [26, 52];
const SMALL_ICONS_SIZES = [40, 40];
const SMALL_ICONS_ANCHOR_COORDINATES = [20, 40];
const NUM_DIGIT = 5;

const URL_OPEN_STREET = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const URL_OPEN_STREET_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAP_ZOOM = 13;
const startCoordinates = {
  lat: 35.6895,
  lng: 139.692
};

function setIconImage (urlImg, iconSizes, anchorCoords) {

  return {
    iconUrl: urlImg,
    iconSize: iconSizes,
    iconAnchor: anchorCoords,
  };
}

const mainPinIcon = L.icon(setIconImage(MAIN_ICON_IMG, MAIN_ICONS_SIZES, MAIN_ICONS_ANCHOR_COORDINATES));

const pinIcon = L.icon(setIconImage(SMALL_ICON_IMG, SMALL_ICONS_SIZES, SMALL_ICONS_ANCHOR_COORDINATES));

const markerProperties = {
  draggable: true,
  icon: mainPinIcon
};

const pinProperties = {
  icon: pinIcon
};

function placeCoordinatesToForm(coord) {
  const addressInput = document.getElementById ('address');
  addressInput.value = `${coord['lat'].toFixed(NUM_DIGIT)}, ${coord['lng'].toFixed(NUM_DIGIT)}`;
}

let marker = L.marker(startCoordinates, markerProperties);
const markerGroup = L.layerGroup();
const map = L.map('map-canvas');

function enableStartCondition(defaultCoordinates) {
  enabledFiltersInputs();
  placeCoordinatesToForm(defaultCoordinates);
  marker.addTo(map);
}

function createPin(Data) {
  resetCurrentStateMap();
  const pinDatas = Data.slice(0, COUNT_ADVERTS);
  pinDatas.forEach((pinData) => {
    const pin = L.marker(pinData.location, pinProperties);
    pin.addTo(markerGroup).bindPopup(putDataToPopup(pinData));
  });
}

function getCoordMarker() {
  marker.on('moveend', (evt) => {
    placeCoordinatesToForm(evt.target.getLatLng());
  });
}

function loadData (Data) {
  createPin(Data);
  setFilter(Data);
}

function setMap() {
  map.on('load', () => {
    enableStartCondition(startCoordinates);
  })
    .setView(startCoordinates, MAP_ZOOM);
  markerGroup.addTo(map);
  L.tileLayer(URL_OPEN_STREET, {attribution: URL_OPEN_STREET_COPYRIGHT}).addTo(map);
  getCoordMarker();
  getData(loadData, showErrorServerWindow);
}

function setDefaultStateMap() {
  marker = L.marker(startCoordinates, markerProperties);
  markerGroup.addTo(map);
  getData(loadData, showErrorServerWindow);
  placeCoordinatesToForm(startCoordinates);
  marker.addTo(map);
  getCoordMarker();
}

function resetCurrentStateMap() {
  markerGroup.clearLayers();
}

const removeMarker = () => marker.remove();

export {setMap, setDefaultStateMap, resetCurrentStateMap, createPin, removeMarker};
