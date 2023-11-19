// WeatherCard.js
import React, { useContext } from "react";
import { weatherConditions } from "../../utils/constants";
import { findWeatherOption } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";

const WeatherCard = ({ day, weather, weatherTemp }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Convert temperature to Celsius if the unit is Celsius
  const convertedTemp =
    currentTemperatureUnit === "C"
      ? Math.round(((weatherTemp - 32) * 5) / 9)
      : weatherTemp;

  const weatherOption = weatherConditions.find((option) =>
    findWeatherOption(option, day, weather)
  );

  const imageSrcUrl = weatherOption?.url || "";

  return (
    <div className="weather">
      <p className="weather__info">
        {convertedTemp}°{currentTemperatureUnit}
      </p>
      <img
        className="weather__image"
        src={imageSrcUrl}
        alt={weatherOption?.weather}
      />
    </div>
  );
};

export default WeatherCard;
