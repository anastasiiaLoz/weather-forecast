import getWe from './getWeatherApi.js';

let settings = {};
const getWeather = async dataSet => {
  if (dataSet.city) {
    try {
      if (
        JSON.parse(localStorage.getItem(dataSet.city)).location ===
          dataSet.city &&
        JSON.parse(localStorage.getItem(dataSet.city)).createTime + 600000 >
          new Date() &&
        new Date(
          JSON.parse(localStorage.getItem(dataSet.city)).createTime,
        ).getDay() === new Date().getDay()
      ) {
        console.log('Берет данные из LocalStorage');
        return JSON.parse(localStorage.getItem(dataSet.city)).object;
      } else {
        await getWe.getWeatherApi(dataSet).then(data => {
          settings.location = dataSet.city;
          settings.createTime = Date.now();
          settings.object = data;
          localStorage.setItem(dataSet.city, JSON.stringify(settings));
          console.log('Берет данные из Fetch запроса');
        });
        return settings.object;
      }
    } catch {
      await getWe
        .getWeatherApi(dataSet)
        .then(data => {
          settings.location = dataSet.city;
          settings.createTime = Date.now();
          settings.object = data;
          localStorage.setItem(dataSet.city, JSON.stringify(settings));
          console.log('Берет данные из Fetch запроса');
        })
        .catch(error => {
          console.log(error);
          return;
        });
      return settings.object;
    }
  } else {
    try {
      if (
        JSON.parse(
          localStorage.getItem(`${dataSet.latitude}+${dataSet.longitude}`),
        ).location === `${dataSet.latitude}+${dataSet.longitude}` &&
        JSON.parse(
          localStorage.getItem(`${dataSet.latitude}+${dataSet.longitude}`),
        ).createTime +
          300000 >
          new Date() &&
        new Date(
          JSON.parse(
            localStorage.getItem(`${dataSet.latitude}+${dataSet.longitude}`),
          ).createTime,
        ).getDay() === new Date().getDay()
      ) {
        console.log('Берет данные из LocalStorage');
        return JSON.parse(
          localStorage.getItem(`${dataSet.latitude}+${dataSet.longitude}`),
        ).object;
      } else {
        await getWe.getWeatherApi(dataSet).then(data => {
          settings.location = `${dataSet.latitude}+${dataSet.longitude}`;
          settings.createTime = Date.now();
          settings.object = data;
          localStorage.setItem(
            `${dataSet.latitude}+${dataSet.longitude}`,
            JSON.stringify(settings),
          );
          console.log('Берет данные из Fetch запроса');
        });
        return settings.object;
      }
    } catch {
      await getWe
        .getWeatherApi(dataSet)
        .then(data => {
          settings.location = `${dataSet.latitude}+${dataSet.longitude}`;
          settings.createTime = Date.now();
          settings.object = data;
          localStorage.setItem(
            `${dataSet.latitude}+${dataSet.longitude}`,
            JSON.stringify(settings),
          );
          console.log('Берет данные из Fetch запроса');
        })
        .catch(error => {
          console.log(error);
          return;
        });
      return settings.object;
    }
  }
};

export default { getWeather };
