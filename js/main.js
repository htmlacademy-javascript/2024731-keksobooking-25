import {makeTestData} from './make-test-data.js';
import {putDataToPopup, clonePopupForm} from './form-filter.js';

const mapContainer = document.querySelector('#map-canvas');
const maxDataEntries = 10;
const testDatas = [];

for (let i = 0; i < maxDataEntries; i++) {
  testDatas[i] = makeTestData(i);
}

putDataToPopup(testDatas[0]);
mapContainer.append(clonePopupForm);

