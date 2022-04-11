import {enableSubmitBtn} from './forms.js';

const documentBody = document.querySelector('body');
const errorMsgTemplate = document.querySelector('#error').content;
const errorMsg = errorMsgTemplate.querySelector('div');
const successMsgTemplate = document.querySelector('#success').content;
const successMsg = successMsgTemplate.querySelector('div');
const errorServerMsgTemplate = document.querySelector('#server').content;
const errorServerMsg = errorServerMsgTemplate.querySelector('div');

function removeListener(currentElement, onMouseCallback, onKeyCallback) {
  currentElement.removeEventListener('click', onMouseCallback);
  document.removeEventListener('keydown', onKeyCallback);
}

function showMsgWindow(element) {
  const currentMsg = documentBody.insertAdjacentElement('beforeend', element);
  currentMsg.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeydown);

  function onClick (evt) {
    const target = evt.target;
    if (target.classList.contains('success')) {
      documentBody.querySelector('.success').remove();
    }
    else if (target.classList.contains('error__button')) {
      documentBody.querySelector('.error').remove();
    }
    removeListener(element, onClick, onKeydown);
    enableSubmitBtn();
  }

  function onKeydown (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      if (currentMsg.classList.contains('success')) {
        documentBody.querySelector('.success').remove();
      }
      else {
        documentBody.querySelector('.error').remove();
      }
      removeListener(element, onClick, onKeydown);
      enableSubmitBtn();
    }
  }
}

const showSuccessWindow = () => showMsgWindow(successMsg);
const showErrorWindow = () => showMsgWindow(errorMsg);
const showErrorServerWindow = () => showMsgWindow(errorServerMsg);

export {showErrorWindow, showSuccessWindow, showErrorServerWindow};
