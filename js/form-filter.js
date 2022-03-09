const inputForm = document.querySelector('.ad-form');
const inputFormFields = inputForm.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters-container');
const mapFilterSelects = mapFilter.querySelectorAll('.map__filter');

const placeCoordinatesToForm = (marker) => {
  const addressInput = document.getElementById ('address');
  const coord = marker.getLatLng();
  addressInput.setAttribute('placeholder', `${coord['lat'].toFixed(5)}, ${coord['lng'].toFixed(5)}`);
};

function disabledFiltersInputs() {
  inputFormFields.forEach((inputFormField) => {
    inputFormField.classList.add('ad-form--disabled');
  });
  mapFilter.classList.add('map__filters--disabled');
  mapFilterSelects.forEach((mapFilterSelect) => {
    mapFilterSelect.setAttribute('disabled', true);
  });
}

function enabledFiltersInputs() {
  inputFormFields.forEach((inputFormField) => {
    inputFormField.classList.remove('ad-form--disabled');
  });
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterSelects.forEach((mapFilterSelect) => {
    mapFilterSelect.removeAttribute('disabled');
  });
}

export {placeCoordinatesToForm, disabledFiltersInputs, enabledFiltersInputs};
