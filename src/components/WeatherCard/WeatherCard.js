// WeatherCard.js
import React, { useContext } from "react";
import { weatherConditions } from "../../utils/constants";
import { findWeatherOption } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";

const WeatherCard = ({ day, weather, weatherTemp }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // No need to convert temperature again, it's already converted
  const convertedTemp = Math.round(weatherTemp);

  const weatherOption = weatherConditions.filter((option) =>
    findWeatherOption(option, day, weather)
  );

  const imageSrcUrl = weatherOption[0].url || "";

  return (
    <div className="weather">
      <p className="weather__info">
        {convertedTemp}°{currentTemperatureUnit}
      </p>
      <img
        className="weather__image"
        src={imageSrcUrl}
        alt={weatherOption[0].weather}
      />
    </div>
  );
};

export default WeatherCard;
