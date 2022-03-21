
const documentBody = document.querySelector('body');
const errorMsgTemplate = document.querySelector('#error').content;
const errorMsg = errorMsgTemplate.querySelector('div');
const successMsgTemplate = document.querySelector('#success').content;
const successMsg = successMsgTemplate.querySelector('div');

function openSuccessMsgWindow() {
  documentBody.insertAdjacentElement('beforeend', successMsg);
}

function openErrorMsgWindow() {
  documentBody.insertAdjacentElement('beforeend', errorMsg);
}

function closeSuccessWindow(event) {
  if(event.target.classList.contains('success')) {
    const successWindow = document.querySelector('.success');
    successWindow.remove();
  }
}

function closeErrorWindow(event) {
  if(event.target.classList.contains('error__button')) {
    const errorWindow = document.querySelector('.error');
    errorWindow.remove();
  }
}

documentBody.addEventListener('click', (evt) => {
  closeErrorWindow(evt);
  closeSuccessWindow(evt);
});

export {openErrorMsgWindow, openSuccessMsgWindow};
