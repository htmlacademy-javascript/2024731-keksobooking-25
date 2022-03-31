import {placeCoordinatesToForm, enabledFiltersInputs} from './forms.js';
import {showErrorServerWindow} from './infor-windows.js';
import {putDataToPopup} from './forms.js';
import {getData} from './api.js';

const MAIN_ICON_IMG = './img/main-pin.svg';
const SMALL_ICON_IMG = './img/pin.svg';
const MAIN_ICON_SIZES = [52, 52];
const MAIN_ICON_ANCHOR_COORDINATES = [26, 52];
const SMALL_ICON_SIZES = [40, 40];
const SMALL_ICON_ANCHOR_COORDINATES = [20, 40];

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

const mainPinIcon = L.icon(setIconImage(MAIN_ICON_IMG, MAIN_ICON_SIZES, MAIN_ICON_ANCHOR_COORDINATES));

const pinIcon = L.icon(setIconImage(SMALL_ICON_IMG, SMALL_ICON_SIZES, SMALL_ICON_ANCHOR_COORDINATES));

const markerProperties = {
  draggable: true,
  icon: mainPinIcon
};

const pinProperties = {
  icon: pinIcon
};

let marker = L.marker(startCoordinates, markerProperties);
const markerGroup = L.layerGroup();
const map = L.map('map-canvas');

function enableStartCondition(defaultCoordinates) {
  enabledFiltersInputs();
  placeCoordinatesToForm(defaultCoordinates);
  marker.addTo(markerGroup);
}

function createPin(pinDatas) {
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

function setMap() {
  map.on('load', () => {
    enableStartCondition(startCoordinates);
  })
    .setView(startCoordinates, MAP_ZOOM);
  markerGroup.addTo(map);
  L.tileLayer(URL_OPEN_STREET, {attribution: URL_OPEN_STREET_COPYRIGHT}).addTo(map);
  getCoordMarker();
  getData(createPin, showErrorServerWindow);
}

function setDefaultStateMap() {
  marker = L.marker(startCoordinates, markerProperties);
  markerGroup.addTo(map);
  getData(createPin, showErrorServerWindow);
  marker.addTo(markerGroup);
  getCoordMarker();
}

function resetCurrentStateMap() {
  markerGroup.clearLayers();
}

export {setMap, setDefaultStateMap, resetCurrentStateMap};
