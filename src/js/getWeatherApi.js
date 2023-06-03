const BASEURL = 'https://api.openweathermap.org/data/2.5/';
const APIKEY = '48bbbb719c2c5b12dc6d3c6ec2e60cd2';
const UNITSCOUNT = '40';
const UNITS = 'metric';
const DAYSFORFORECAST = 5;
const WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const MONTHLONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function apiFiveDaysEveryThreeHours(locationString) {
  return fetch(
    `${BASEURL}forecast?${locationString}&appid=${APIKEY}&cnt=${UNITSCOUNT}&units=${UNITS}`,
  )
    .then(responce => responce.json())
    .catch(error => {
      localStorage.setItem('currentPos', JSON.stringify({ city: 'Kiev' }));
      console.log(error);
    });
}

function apiEveryDay(lat, lon) {
  return fetch(
    `${BASEURL}onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${APIKEY}&units=${UNITS}`,
  )
    .then(responce => responce.json())
    .catch(error => {
      localStorage.setItem('currentPos', JSON.stringify({ city: 'Kiev' }));
      console.log(error);
    });
}

function getTimeString(date) {
  let dateString = '';

  date.getHours() < 10
    ? (dateString += `0${date.getHours()}`)
    : (dateString += `${date.getHours()}`);

  dateString += ':';

  date.getMinutes() < 10
    ? (dateString += `0${date.getMinutes()}`)
    : (dateString += `${date.getMinutes()}`);

  return dateString;
}

const getWeatherApi = async ({ city, latitude, longitude }) => {
  let locationString = '';
  city
    ? (locationString = `q=${city}`)
    : (locationString = `lat=${latitude}&lon=${longitude}`);

  let weatherData = {
    everyDay: [],
    eachDayEveryThreeHours: [],
  };

  const fiveDaysObject = await apiFiveDaysEveryThreeHours(locationString);
  const everyDayObject = await apiEveryDay(
    fiveDaysObject.city.coord.lat,
    fiveDaysObject.city.coord.lon,
  );

  weatherData.cityName = fiveDaysObject.city.name;
  weatherData.countryName = fiveDaysObject.city.country;
  weatherData.currentWeatherIcon = everyDayObject.current.weather[0].icon;
  weatherData.currentDayOfWeek = WEEK[
    new Date(everyDayObject.current.dt * 1000).getDay()
  ].slice(0, 3);
  weatherData.currentMonth =
    MONTHLONG[new Date(everyDayObject.current.dt * 1000).getMonth()];
  weatherData.currentTemp = Math.round(everyDayObject.current.temp);
  weatherData.currentMinTemp = Math.round(everyDayObject.daily[0].temp.min);
  weatherData.currentMaxTemp = Math.round(everyDayObject.daily[0].temp.max);
  weatherData.currentSunRise = getTimeString(
    new Date(everyDayObject.current.sunrise * 1000),
  );

  weatherData.currentSunSet = getTimeString(
    new Date(everyDayObject.current.sunset * 1000),
  );

  everyDayObject.daily.forEach((el, index) => {
    weatherData.everyDay.push({
      elementIndex: index,
      dayOfWeek: WEEK[new Date(el.dt * 1000).getDay()],
      day: new Date(el.dt * 1000).getDate(),
      month: MONTH[new Date(el.dt * 1000).getMonth()],
      year: new Date(el.dt * 1000).getFullYear(),
      dayAvarageTemp: Math.round((el.temp.max + el.temp.min) / 2),
      dayMinTemp: Math.round(el.temp.min),
      dayMaxTemp: Math.round(el.temp.max),
      dayWeatherIcon: el.weather[0].icon,
      humidity: el.humidity,
      pressure: el.pressure,
      windSpeed: Math.round(el.wind_speed * 10) / 10,
    });
  });

  weatherData.everyDay = weatherData.everyDay.slice(0, DAYSFORFORECAST);

  let dayCounter = new Date().getDate();

  fiveDaysObject.list.forEach(el => {
    if (new Date(el.dt_txt).getDate() === dayCounter) {
      weatherData.eachDayEveryThreeHours.push([]);
      dayCounter++;
    }
  });

  dayCounter = new Date().getDate();
  let counter = 0;

  fiveDaysObject.list.forEach(el => {
    if (new Date(el.dt_txt).getDate() === dayCounter) {
      weatherData.eachDayEveryThreeHours[counter].push({
        time: getTimeString(new Date(el.dt_txt)),
        weatherIcon: el.weather[0].icon,
        temp: Math.round(el.main.temp),
        pressure: el.main.pressure,
        humidity: el.main.humidity,
        windSpeed: Math.round(el.wind.speed * 10) / 10,
      });
    } else {
      counter++;
      weatherData.eachDayEveryThreeHours[counter].push({
        time: getTimeString(new Date(el.dt_txt)),
        weatherIcon: el.weather[0].icon,
        temp: Math.round(el.main.temp),
        pressure: el.main.pressure,
        humidity: el.main.humidity,
        windSpeed: Math.round(el.wind.speed * 10) / 10,
      });
      dayCounter++;
    }
  });

  weatherData.eachDayEveryThreeHours = weatherData.eachDayEveryThreeHours.slice(
    0,
    DAYSFORFORECAST,
  );
  return weatherData;
};

export default { getWeatherApi };
