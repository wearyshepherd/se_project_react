import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { defaultClothingItems } from "../../utils/constants";
import {
  getForecastWeather,
  parseCityData,
  parseWeatherData,
} from "../../utils/weatherApi.js";
import "./App.css";
import "../ModalWithForm/ModalWithForm.css";

const App = () => {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        setTemp(parseWeatherData(data));
        // Here, you can set the city using parseCityData or any other logic based on the forecast data.
        // For example:
        const parsedCity = parseCityData(data);
        setCity(parsedCity); // Set city based on forecast data
      })
      .catch((err) => {
        console.error(err);
      });
  }, []); // The empty dependency array ensures this effect runs once after the initial render

  return (
    // ... rest of your component code
  );
};

export default App;

