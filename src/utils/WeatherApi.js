import { latitude, longitude, APIkey } from "./constants";
import { processServerResponse } from "../utils/Api/Api";



export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(processServerResponse);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  };
  return weather;
};

//weather.temperature.F = ` ${Math.round(data.main.temp)}°F`;
//weather.temperature.C = ` ${Math.round((data.main.temp - 32) * 5/9)}°C`;
