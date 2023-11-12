import React, { useEffect, useState } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Route, Switch } from "react-router-dom";
import { getCards, postCard, deleteCard } from "../../utils/api";
import {
  getForecastWeather,
  parseCityData,
  parseWeatherData,
} from "../../utils/weatherApi.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithConfirmation from "../ModalWithConfirmation/ModalWithConfirmation";
import "./App.css";

const App = () => {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [error, setError] = useState(null);

  const closeModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleOnAddItemSubmit = async ({ name, imageUrl, weather }) => {
    const newItem = {
      name,
      imageUrl,
      weather,
    };

    try {
      await postCard(newItem);
      setClothingItems([newItem, ...clothingItems]);
      closeModal();
    } catch (error) {
      console.error("Error adding item:", error);
      setError("Error adding item. Please try again.");
    }
  };

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const handleCardDelete = async () => {
    try {
      await deleteCard(selectedCard._id);
      const updatedClothing = clothingItems.filter(
        (item) => item._id !== selectedCard._id
      );
      setClothingItems(updatedClothing);
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Error deleting item. Please try again.");
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cards = await getCards();
        setClothingItems(cards);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        setError("Error fetching clothing items. Please try again.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getForecastWeather();
        setTemp(parseWeatherData(data));
        setCity(parseCityData(data));
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Error fetching weather data. Please try again.");
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={() => openModal("create")} weatherCity={city} />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
          </Route>
          <Route path="/profile">
            <Profile
              onSelectCard={handleSelectedCard}
              handleOpenModal={() => openModal("create")}
              clothingItems={clothingItems}
            />
          </Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={closeModal}
            isOpen={activeModal === "create"}
            onAddItem={handleOnAddItemSubmit}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={closeModal}
            openModal={() => openModal("delete")}
          />
        )}
        {activeModal === "delete" && (
          <ModalWithConfirmation
            isOpen={activeModal === "delete"}
            onClose={closeModal}
            onSubmit={handleCardDelete}
          />
        )}
        {error && <div className="error-message">{error}</div>}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
};

export default App;



