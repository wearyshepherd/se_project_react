import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";
import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

// ... (your imports)

function Main({
  isLoggedIn,
  weatherTemp,
  onSelectedCard,
  clothingItems,
  handleLikeClick,
}) {
  const currentTemperatureUnit = useContext(CurrentTemperatureUnitContext);
  const temp =
    weatherTemp?.temperature?.[currentTemperatureUnit.currentTemperatureUnit];
  const getWeatherType = () => {
    if (currentTemperatureUnit.currentTemperatureUnit === "F") {
      if (temp >= 86) {
        return "hot";
      } else if (temp >= 66 && temp <= 85) {
        return "warm";
      } else if (temp <= 65) {
        return "cold";
      }
    }

    if (currentTemperatureUnit.currentTemperatureUnit === "C") {
      if (temp >= 30) {
        return "hot";
      } else if (temp >= 19 && temp <= 29) {
        return "warm";
      } else if (temp <= 18) {
        return "cold";
      }
    }
  };

  const weatherType = getWeatherType();

const filteredCards = Array.isArray(clothingItems)
  ? clothingItems
      .filter((item) => item?.weather && item.weather.toLowerCase() === weatherType)
  : [];

  return (
    <main className="main">
      <WeatherCard day={true} type="sunny" weatherTemp={temp} />
      <section className="card__section" id="card-section">
        Today is {temp}° {currentTemperatureUnit.currentTemperatureUnit} / You
        may want to wear:
        <div className="card__items">
          {filteredCards.map((item) => (
            <ItemCard
              key={item?._id ?? item?.id}
              item={item}
              onSelectedCard={onSelectedCard}
              handleLikeClick={handleLikeClick}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;

