import {disabledFiltersInputs} from './forms.js';
import {setUserFormSubmit} from './validate-form.js';
import {showErrorWindow, showSuccessWindow} from './infor-windows.js';
import {setMap} from './map.js';
import './slider.js';
import './load-photo.js';

disabledFiltersInputs();
setMap();
setUserFormSubmit(showSuccessWindow, showErrorWindow);

