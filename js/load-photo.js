const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarChooser = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.setup-user-pic');
const houseChooser = document.querySelector('#images');
const previewHouse = document.querySelector('.ad-form__photo');
const photoHouseForm = document.querySelector('.ad-form__photo-container');

function addImageBox(view) {
  const newBoxImage = document.createElement('div');
  const newImage = document.createElement('img');

  view = document.querySelectorAll('.ad-form__photo');
  newBoxImage.classList.add('ad-form__photo');
  photoHouseForm.insertAdjacentElement('beforeend', newBoxImage);

  return view[view.length - 1].appendChild(newImage);
}

function chooseFile(element, view) {
  if (view.tagName !== 'IMG') {
    view = addImageBox(view);
  }
  const file = element.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    view.src = URL.createObjectURL(file);
  }
}

avatarChooser.addEventListener('change', () => chooseFile(avatarChooser, previewAvatar));
houseChooser.addEventListener('change', () => chooseFile(houseChooser, previewHouse));
