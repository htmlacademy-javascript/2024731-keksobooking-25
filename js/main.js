import {makeTestData} from './make-test-data.js';

const maxDataEntries = 10;
const testData = [];

for (let i = 0; i < maxDataEntries; i++) {
  testData[i] = makeTestData(i);
}

