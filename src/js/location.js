import back from './setBackground.js';
import liTempl from '../templates/favCountry.hbs';
import renderCurr from './renderCurrentWether.js';
import renderSec from './renderSecondPart.js';
import renderQ from './quoteForismatic.js';

JSON.parse(localStorage.getItem('currentPos')) === null
  ? localStorage.setItem('currentPos', JSON.stringify({ city: 'Kiev' }))
  : '';

function getFetch() {
  renderCurr.renderFirstPart();
  renderSec.getFetch();
  back.setBackground();
  setTimeout(() => {
    renderQ.renderQuote();
  }, 200);
}

const ref = {
  inputForm: document.querySelector('.inputForm'),
  locBtn: document.querySelector('.locationBtn'),
  input: document.querySelector('.search-box'),
  checkbox: document.querySelector('.star'),
};

let getlocalSorArr = JSON.parse(localStorage.getItem('favPos'));

function addLiTempl() {
  if (getlocalSorArr !== null) {
    setfavArrTolocalStorage = getlocalSorArr.favPos;
    document
      .querySelector('.city_list')
      .insertAdjacentHTML('beforeend', liTempl(getlocalSorArr));
  }

  if (setfavArrTolocalStorage.length === 0) {
    document.querySelector('.favBtn').style.display = 'none';
  } else {
    document.querySelector('.favBtn').style.display = 'block';
  }
  getFetch();
}

let inputCityName;
let setfavArrTolocalStorage = [];

function getLocationOnStar(e) {
  if (setfavArrTolocalStorage.includes(inputCityName)) {
    alert('Этот город добавлен в избранное!');
  } else {
    if (inputCityName === undefined || inputCityName === ' ') {
      alert('Вы ничего не ввели!');
    } else {
      setfavArrTolocalStorage.push(inputCityName);
      localStorage.setItem(
        'favPos',
        JSON.stringify({ favPos: setfavArrTolocalStorage }),
      );
      document.querySelector('.city_list').insertAdjacentHTML(
        'beforeend',
        `<li class="list_item">
    <p class="list_item_name">${inputCityName}</p> <button class="close"> <svg class="svg">
            <use href="./images/symbol-defs.svg#icon-close"></use></svg> </button></li>`,
      );
      document.querySelector('.favBtn').style.display = 'block';
    }
  }
}

const list = document.querySelector('.city_list');
list.addEventListener('click', deliteCauntry);

function deliteCauntry(e) {
  let dellCountry = [];
  let btn = e.target;
  while (btn && btn.tagName != 'BUTTON') {
    btn = btn.parentNode;
    if (btn === this) {
      btn = null;
    }
  }
  if (btn) {
    this.removeChild(btn.parentNode);
    dellCountry.push(btn.parentNode.textContent.replace(/\s+/g, ' ').trim());
    setfavArrTolocalStorage.splice(
      setfavArrTolocalStorage.indexOf(dellCountry[0]),
      1,
    );
    localStorage.setItem(
      'favPos',
      JSON.stringify({ favPos: setfavArrTolocalStorage }),
    );
    if (setfavArrTolocalStorage.length === 0) {
      document.querySelector('.favBtn').style.display = 'none';
    }
  }
  if (e.target) {
    localStorage.setItem(
      'currentPos',
      JSON.stringify({ city: e.target.textContent }),
    );
    getFetch();
  }
}

if (setfavArrTolocalStorage.length === 0) {
  document.querySelector('.favBtn').style.display = 'none';
}
if (setfavArrTolocalStorage.includes(inputCityName)) {
  let checkValue = (document.querySelector('.star').checked = true);
  console.log(checkValue);
  console.log(setfavArrTolocalStorage);
}

function getLocationOnInput(e) {
  if (setfavArrTolocalStorage.includes(e.currentTarget.value)) {
    let checkValue = (document.querySelector('.star').checked = true);
  }
  inputCityName = e.currentTarget.value;
  localStorage.setItem('currentPos', JSON.stringify({ city: inputCityName }));
  setTimeout(() => {
    getFetch();
  }, 100);
}
function getLocationOnClick(e) {
  navigator.geolocation.getCurrentPosition(function (position) {
    localStorage.setItem(
      'currentPos',
      JSON.stringify({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
    );
  });
  setTimeout(() => {
    getFetch();
  }, 100);
  console.log('location-fetch');
}
document.addEventListener('DOMContentLoaded', addLiTempl);
ref.input.addEventListener('change', getLocationOnInput);
ref.locBtn.addEventListener('click', getLocationOnClick);
ref.checkbox.addEventListener('click', getLocationOnStar);
ref.inputForm.addEventListener('submit', e => {
  e.preventDefault();
});
