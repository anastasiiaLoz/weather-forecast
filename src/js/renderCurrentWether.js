import api from './getWeather.js';

const ref = {
  box1: document.querySelector('#conBox'),
  weBox: document.querySelector('.weatherBox'),
  positionBtn: document.querySelector('.positionBtn'),
};

function renderFirstPart() {
  // document.querySelector();
  ref.weBox.style.flexDirection = 'column-reverse';
  ref.box1.classList.remove('contentBox');
  ref.positionBtn.classList.remove('positionBtn');
  api
    .getWeather(JSON.parse(localStorage.getItem('currentPos')))
    .then(data => {
      ref.box1.innerHTML = `
            <div class="firstPart">
                <svg class="firstPart-icon" width="35" height="35">
                     <use href="./images/symbol-defs.svg#${data.currentWeatherIcon}"></use>
                 </svg>
                <h1 class="firstPart-location">${data.cityName},${data.countryName}</h1>
                <div class="firstPart-temperature">
                    <h2 class="firstPart-temperature-main">${data.currentTemp}</h2>
                    <div class="firstPart-temperature-box">
                        <div class="firstPart-temperature-box1">
                            <p class="firstPart-temperature-min">min</p>
                            <p class="firstPart-temperature-minnumb">${data.currentMinTemp}&deg;</p>
                        </div>
                        <div class="firstPart-temperature-box2">
                            <p class="firstPart-temperature-max">max</p>
                            <p class="firstPart-temperature-maxnumb">${data.currentMaxTemp}&deg;</p>
                        </div>
                    </div>
                </div>
            </div>`;
    })
    .catch(error => {
      alert('Неправильный ввод');
      localStorage.setItem('currentPos', JSON.stringify({ city: 'Kiev' })); // Тест
      console.log(error);
    });
}
// renderFirstPart();

export default { renderFirstPart };
