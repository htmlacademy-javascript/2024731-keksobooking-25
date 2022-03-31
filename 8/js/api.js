import {disableMapFilter, enableMapFilter} from './forms.js';

const URL_IN_DATA = 'https://25.javascript.pages.academy/keksobooking/data';
const URL_OUT_DATA = 'https://25.javascript.pages.academy/keksobooking';
const COUNT_ADVERTS = 10;

function getData(makePins, onFail) {
  fetch(URL_IN_DATA)
    .then((response) => {
      if (response.ok) {
        enableMapFilter();
        return response;
      }
    })
    .then((response) => response.json())
    .then((data) => makePins(data.slice(0, COUNT_ADVERTS)))
    .catch(() => {
      disableMapFilter();
      onFail();
    });
}

function sendData(formDatas, onSuccess, onFail) {
  fetch(URL_OUT_DATA,
    {
      method: 'POST',
      body: formDatas,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .catch(() => {
      onFail();
    });
}

export {getData, sendData};
