import {placeCoordinatesToForm, enabledFiltersInputs} from './form-filter.js';
import {makeTestData} from './make-test-data.js';
import {putDataToPopup} from './form-filter.js';

const mainIconImage = {
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const smallIconImage = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};
const urlOpenstreet = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attributionLink = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const zoom = 13;
const maxCountPin = 10;
const testDatas = [];
const startCoordinates = {
  lat: 35.6895,
  lng: 139.692
};

const mainPinIcon = L.icon(mainIconImage);

const pinIcon = L.icon(smallIconImage);

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

function enableStartCondition() {
  enabledFiltersInputs();
  marker.addTo(map);
  placeCoordinatesToForm(startCoordinates);
}

L.tileLayer(urlOpenstreet, {
  attribution: attributionLink
}).on('load', () => {
  enableStartCondition();
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
