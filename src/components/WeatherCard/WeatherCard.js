import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import React, { useContext } from "react";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherOption = weatherOptions.filter((option) => {
    return option.day === day && option.type === type;
  });

  const imageSourceUrl = weatherOption[0].url || "";
  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {weatherTemp}°{currentTemperatureUnit}
      </div>
      <img src={imageSourceUrl} alt="weather" className="weather__image" />
    </section>
  );
};

export default WeatherCard;

// const WeatherCard = ({ day, type, weatherTemp = "", isFahrenheit }) => {
//   const imageSource = weatherOptions.filter((option) => {
//     return option.day === day && option.type === type;
//   });

//   const imageSourceUrl = imageSource[0].url || "";

//   const temperature = isFahrenheit ? weatherTemp : ((weatherTemp - 32) * 5) / 9;

//   return (
//     <section className="weather" id="weather">
//       <div className="weather__info">
//         {Math.round(temperature)}
//         {isFahrenheit ? "°F" : "°C"}
//       </div>
//       <img src={imageSourceUrl} alt="weather" className="weather__image" />
//     </section>
//   );
// };

// export default WeatherCard;
