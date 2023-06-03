import api from './getWeather';
import back from './setBackground.js';
import renderCurrent from './renderCurrentWether.js';
import renderQuote from './quoteForismatic.js';

const div = document.querySelector('.additionalInfo');
const click5days = document.querySelector('[data-action="fiveDays"]');
const clickToday = document.querySelector('[data-action="today"]');

const todayClickFunc = () => {
  getFetch();
  clock();
  back.setBackground();
  div.innerHTML = '';
  renderCurrent.renderFirstPart();
  renderQuote.renderQuote();
  clickToday.removeEventListener('click', todayClickFunc);
  click5days.addEventListener('click', fiveDaysClickFunk);
};

const fiveDaysClickFunk = () => {
  clearInterval(interval);
  back.setBackground();
  clickToday.addEventListener('click', todayClickFunc);
  click5days.removeEventListener('click', fiveDaysClickFunk);
};

click5days.addEventListener('click', fiveDaysClickFunk);

function getFetch() {
  api
    .getWeather(JSON.parse(localStorage.getItem('currentPos')))
    .then(data => {
      console.log(data);
      renderSecPart(data);
    })
    .catch(error => {
      localStorage.setItem('currentPos', JSON.stringify({ city: 'Kiev' })); // Тест
      console.log(error);
    });
}

let interval;

function clock() {
  interval = setInterval(() => {
    document.querySelector(
      '.secondPartBox-dateBox-time',
    ).innerHTML = new Date().toLocaleTimeString();
  }, 500);
}

function renderSecPart(data) {
  div.innerHTML = `<div class="secondPartBox">
    <h2 class="secondPartBox-date">${data.everyDay[0].day}<sup>th</sup> ${data.currentDayOfWeek}</h2>
    <div class='secondPartBox-combi'>
    <div class="secondPartBox-dateBox">
    <p class="secondPartBox-dateBox-month">${data.currentMonth}</p>
    <p class="secondPartBox-dateBox-time"></p>
    </div>
    <div class="secondPartBox-sun">
    <p class="secondPartBox-sun-sunrise"><svg class="secondPartBox-sun-icon" width="20" height="20">    
    <use href="./images/symbol-defs.svg#icon-sunrise"></use>
    </svg>${data.currentSunRise}</p>
    <p class="secondPartBox-sun-sunset"><svg class="secondPartBox-sun-icon" width="20" height="20">
    <use href="./images/symbol-defs.svg#icon-sunset"></use>
    </svg>${data.currentSunSet}</p>
    </div>
    </div>`;
}

clock();

export default { getFetch };
