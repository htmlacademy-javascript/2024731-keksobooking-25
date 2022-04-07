import {disabledFiltersInputs} from './forms.js';
import {setUserFormSubmit} from './validate-form.js';
import {showErrorWindow, showSuccessWindow} from './infor-windows.js';
import {setFilter} from './filter.js';
import {setMap} from './map.js';
import {getData} from './api.js';
import './slider.js';
import './load-photo.js';

disabledFiltersInputs();
setMap();
getData(setFilter, showErrorWindow);
setUserFormSubmit(showSuccessWindow, showErrorWindow);

