// объявление пользовательской метки
const advertIcon = L.divIcon({className: 'myicon', iconSize: [40, 40]});
const basicIcon = L.divIcon({className: 'myicon-1', iconSize: [52, 52]});

function makeMap(elemenеId, defaultCoord, zoom) {
  return L.map(elemenеId).setView(defaultCoord, zoom);
}

function addTiles(map) {
  return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}

function placeMarkerToMap(defaultCoord, myIcon, map, bool = false) {
  return L.marker(defaultCoord, {'draggable': bool, icon: myIcon}).addTo(map);
}


export {addTiles, makeMap, placeMarkerToMap, advertIcon, basicIcon};
