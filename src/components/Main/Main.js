import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
//import { defaultClothingItems } from "../../utils/constants";
import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard, clothingItems }) {
  console.log("clothing items");
  console.log(clothingItems);
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(currentTemperatureUnit);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;

  const getWeatherType = () => {
    if (currentTemperatureUnit === "C") {
      if (temp >= 30) {
        return "hot";
      } else if (temp >= 19 && temp <= 29) {
        return "warm";
      } else if (temp <= 18) {
        return "cold";
      }
    }

    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  };

  const weatherType = getWeatherType();
  console.log(weatherType);

  const filteredCards = clothingItems.filter((item) => {
    return (
      item?.weather?.toLowerCase() === weatherType ||
      item?.weatherType?.toLowerCase() === weatherType
    );
  });

  // const filteredCards = clothingItems.filter((item) => {
  //   return item.weather.toLowerCase() === weatherType;
  // });

  return (
    <main className="main">
      <WeatherCard day={true} type="fog" weatherTemp={temp} />
      <section className="clothing" id="clothing-section">
        <div className="clothing__title">
          Today is {temp}°{currentTemperatureUnit} / You may want to wear:{" "}
        </div>
        <div className="clothing__items">
          {filteredCards.map((item) => (
            <ItemCard item={item} onSelectCard={onSelectCard} key={item.id} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
