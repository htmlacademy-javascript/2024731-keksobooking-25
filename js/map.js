import {placeCoordinatesToForm, enabledFiltersInputs} from './form-filter.js';
import {makeTestData} from './make-test-data.js';
import {putDataToPopup} from './form-filter.js';

const zoom = 13;
const maxCountPin = 10;
const testDatas = [];
const startCoordinates = {
  lat: 35.6895,
  lng: 139.692
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerProperties = {
  draggable: true,
  icon: mainPinIcon
};

const pinProperties = {
  icon: pinIcon
};

const marker = L.marker(startCoordinates, markerProperties);
const map = L.map('map-canvas').setView(startCoordinates, zoom);
const markerGroup = L.layerGroup().addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).on('load', () => {
  enabledFiltersInputs();
  marker.addTo(map);
  placeCoordinatesToForm(startCoordinates);
}).addTo(map);

marker.on('moveend', (evt) => {
  placeCoordinatesToForm(evt.target.getLatLng());
});

function createPin(pinDatas) {
  const pin = L.marker(pinDatas.location, pinProperties);
  pin.addTo(markerGroup).bindPopup(putDataToPopup(pinDatas));
}

for(let i = 0; i < maxCountPin; i++) {
  testDatas[i] = makeTestData(i);
  createPin(testDatas[i]);
}
