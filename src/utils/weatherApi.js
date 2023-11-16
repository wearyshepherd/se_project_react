import { apiKey, latitude, longitude } from "../utils/constants";
import { request } from '../utils/api';

const getForecastWeather = () => {
  const weatherData = request(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`)
  return weatherData;
};

const parseWeatherData = (data) => {
  const main = data.main;
  const temp = main && main.temp;
  return Math.ceil(temp);
};

const parseCityData = (data) => {
  const city = data && data.name;
  return city;
}

const getWeatherType = (weatherTemp) => {
  if (weatherTemp >= 86) {
    return "hot";
  } else if (weatherTemp >= 66 && weatherTemp <= 85) {
    return "warm";
  } else if (weatherTemp <= 65) {
    return "cold";
  }
};

const findWeatherOption = (option, day, weather) => {
  return option.day === day && option.weather === weather;
};

export {
  getWeatherType,
  parseWeatherData,
  getForecastWeather,
  findWeatherOption,
  parseCityData,
};
