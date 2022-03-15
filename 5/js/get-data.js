const urlData = 'https://25.javascript.pages.academy/keksobooking/data';
async function getData (url) {
  let obj = [];
  await fetch(url).then((responce) => responce.json())
    .then((data) => {
      obj = data;
    });
  return obj;
}

export {getData, urlData};
