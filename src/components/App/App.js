import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  getForecastWeather,
  parseWeatherData,
} from "../../utils/weatherApi.js";
import "./App.css";
import "../ModalWithForm/ModalWithForm.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
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
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} />
        <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
        <Footer />
        {activeModal === "create" && (
          <ModalWithForm
            title="New Garment"
            buttonText="Add Garment"
            onClose={handleCloseModal}
          >
            <label className="modal__label">Name</label>
            <input
              className="modal__input modal__input_type_text"
              type="text"
              name="name"
              minLength="1"
              maxLength="30"
              placeholder="Name"
              id="name"
            />
            <label className="modal__label">Image</label>
            <input
              className="modal__input modal__input_type_text"
              type="url"
              name="link"
              minLength="1"
              id="link"
              placeholder="Image URL"
            />
            <label className="modal__label">Select the weather type:</label>
            <div className="modal__radio-container">
              <input
                className="modal__input_radio"
                type="radio"
                name="weatherType"
                id="Hot"
                value="hot"
              />
              <label className="modal__label_radio" htmlFor="Hot">
                Hot
              </label>
              <input
                className="modal__input_radio"
                type="radio"
                name="weatherType"
                id="Warm"
                value="warm"
              />
              <label className="modal__label_radio" htmlFor="Warm">
                Warm
              </label>
              <input
                className="modal__input_radio"
                type="radio"
                name="weatherType"
                id="Cold"
                value="cold"
              />
              <label className="modal__label_radio" htmlFor="Cold">
                Cold
              </label>
            </div>
          </ModalWithForm>
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;

